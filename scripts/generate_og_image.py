from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS_DIR = ROOT / "assets"
OUTPUT_PATH = ASSETS_DIR / "og-image.png"

WIDTH = 1200
HEIGHT = 630

BG_TOP = "#f0fdf4"
BG_BOTTOM = "#dcfce7"
CARD = "#ffffff"
BRAND = "#047857"
BRAND_STRONG = "#065f46"
INK = "#1c1e21"
MUTED = "#4b5563"
WHITE = "#ffffff"

CARD_RECT = (70, 70, WIDTH - 70, HEIGHT - 70)
BADGE_RECT = (110, 110, 290, 290)
CONTENT_X = 340
CONTENT_MAX_WIDTH = 680
BUTTON_Y_GAP = 40

TITLE_LINES = [
    "Bricks to Blocks",
    "Materials & Downloads",
]
DESCRIPTION = (
    "Open project materials, reference documents, and direct PDF downloads in one place."
)
BUTTON_LABEL = "Download PDFs"


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    font_paths = [
        Path(r"C:\Windows\Fonts\arialbd.ttf") if bold else Path(r"C:\Windows\Fonts\arial.ttf"),
        Path(r"C:\Windows\Fonts\segoeuib.ttf") if bold else Path(r"C:\Windows\Fonts\segoeui.ttf"),
    ]
    for path in font_paths:
        if path.exists():
            try:
                return ImageFont.truetype(str(path), size=size)
            except OSError:
                continue
    return ImageFont.load_default()


def hex_to_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def interpolate_rgb(start: tuple[int, int, int], end: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return tuple(int(start[index] + (end[index] - start[index]) * t) for index in range(3))


def wrap_text(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.ImageFont, max_width: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = word if not current else f"{current} {word}"
        candidate_width = draw.textbbox((0, 0), candidate, font=font)[2]
        if candidate_width <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def fit_wrapped_text(
    draw: ImageDraw.ImageDraw, text: str, max_width: int, font_sizes: list[int], max_lines: int
) -> tuple[ImageFont.ImageFont, list[str]]:
    for size in font_sizes:
        font = load_font(size)
        lines = wrap_text(draw, text, font, max_width)
        if len(lines) <= max_lines:
            return font, lines
    fallback_font = load_font(font_sizes[-1])
    return fallback_font, wrap_text(draw, text, fallback_font, max_width)


def draw_background(image: Image.Image) -> None:
    pixels = image.load()
    top = hex_to_rgb(BG_TOP)
    bottom = hex_to_rgb(BG_BOTTOM)
    for y in range(HEIGHT):
        color = interpolate_rgb(top, bottom, y / max(HEIGHT - 1, 1))
        for x in range(WIDTH):
            pixels[x, y] = color


def main() -> None:
    ASSETS_DIR.mkdir(exist_ok=True)

    image = Image.new("RGB", (WIDTH, HEIGHT), BG_TOP)
    draw_background(image)
    draw = ImageDraw.Draw(image)

    draw.rounded_rectangle(CARD_RECT, radius=42, outline=BRAND, width=3, fill=CARD)
    draw.rounded_rectangle(BADGE_RECT, radius=36, fill=BRAND)

    badge_font = load_font(84, bold=True)
    badge_bbox = draw.textbbox((0, 0), "B2B", font=badge_font)
    badge_x = (BADGE_RECT[0] + BADGE_RECT[2] - (badge_bbox[2] - badge_bbox[0])) / 2
    badge_y = (BADGE_RECT[1] + BADGE_RECT[3] - (badge_bbox[3] - badge_bbox[1])) / 2 - 10
    draw.text((badge_x, badge_y), "B2B", font=badge_font, fill=WHITE)

    kicker_font = load_font(26, bold=True)
    title_font = load_font(56, bold=True)
    description_font, description_lines = fit_wrapped_text(
        draw=draw,
        text=DESCRIPTION,
        max_width=CONTENT_MAX_WIDTH,
        font_sizes=[30, 28, 26, 24],
        max_lines=2,
    )
    button_font = load_font(28, bold=True)

    draw.text((CONTENT_X, 135), "PEDL", font=kicker_font, fill=BRAND_STRONG)

    title_y = 180
    line_gap = 16
    for line in TITLE_LINES:
        draw.text((CONTENT_X, title_y), line, font=title_font, fill=INK)
        line_height = draw.textbbox((0, 0), line, font=title_font)[3]
        title_y += line_height + line_gap

    description_y = 360
    description_line_gap = 10
    for line in description_lines:
        draw.text((CONTENT_X, description_y), line, font=description_font, fill=MUTED)
        line_height = draw.textbbox((0, 0), line, font=description_font)[3]
        description_y += line_height + description_line_gap

    button_bbox = draw.textbbox((0, 0), BUTTON_LABEL, font=button_font)
    button_width = (button_bbox[2] - button_bbox[0]) + 52
    button_height = (button_bbox[3] - button_bbox[1]) + 30
    button_rect = (
        CONTENT_X,
        description_y + BUTTON_Y_GAP,
        CONTENT_X + button_width,
        description_y + BUTTON_Y_GAP + button_height,
    )
    draw.rounded_rectangle(button_rect, radius=18, fill=BRAND)
    text_x = button_rect[0] + (button_width - (button_bbox[2] - button_bbox[0])) / 2
    text_y = button_rect[1] + (button_height - (button_bbox[3] - button_bbox[1])) / 2 - 4
    draw.text((text_x, text_y), BUTTON_LABEL, font=button_font, fill=WHITE)

    image.save(OUTPUT_PATH, optimize=True)

    print(f"Generated: {OUTPUT_PATH}")
    print(f"Description lines: {description_lines}")
    print(f"Button width: {button_width}")


if __name__ == "__main__":
    main()
