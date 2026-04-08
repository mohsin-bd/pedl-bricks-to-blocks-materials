/**
 * @typedef {Object} ResourceLocale
 * @property {string} title
 * @property {string} description
 * @property {string} buttonLabel
 * @property {string} buttonTitle
 * @property {string} buttonAria
 * @property {string} buttonSrDescription
 * @property {string} metaLead
 */

/**
 * @typedef {Object} ResourceEntry
 * @property {string} id
 * @property {string} sourcePath
 * @property {string} downloadFileName
 * @property {string} mediaType
 * @property {"download"|"manual"|"booklet"} icon
 * @property {{bn: ResourceLocale, en: ResourceLocale}} localeCopy
 */

/**
 * @typedef {Object} LocaleConfig
 * @property {string} key
 * @property {string} htmlLang
 * @property {string} localeCode
 * @property {string} outputPath
 * @property {string} publicPath
 * @property {string} title
 * @property {string} metaDescription
 * @property {string} skipLink
 * @property {string} heading
 * @property {string} subheading
 * @property {string} intro
 * @property {string} projectInfoLabel
 * @property {string} repositoryHeading
 * @property {string} summaryLabel
 * @property {string} downloadsHeading
 * @property {string} downloadsNote
 * @property {string} updatedLabel
 * @property {string} compiledByLabel
 * @property {string} compiledByRole
 * @property {string} institution
 * @property {string} footerContactPrefix
 * @property {string} footerContactSuffix
 * @property {string} license
 * @property {string} projectButtonLabel
 * @property {string} projectButtonTitle
 * @property {string} projectButtonAria
 * @property {string} navProjectLabel
 * @property {string} navProjectTitle
 * @property {string} navDownloadsLabel
 * @property {string} navDownloadsTitle
 * @property {{label: string, title: string, ariaLabel: string, lang: string, href: string, hreflang: string}} languageSwitch
 * @property {string} ogImageAlt
 * @property {string} twitterCardTitle
 * @property {string} twitterCardDescription
 */

/**
 * @typedef {Object} SiteConfig
 * @property {string} siteUrl
 * @property {string} basePath
 * @property {string} themeColor
 * @property {string} backgroundColor
 * @property {string} updatedAt
 * @property {{name: string, shortName: string, description: string}} app
 * @property {{name: string, url: string}} publisher
 * @property {{name: string, url: string, email: string}} compiler
 * @property {string} projectPageUrl
 * @property {{favicon: string, appleTouchIcon: string, icon192: string, icon512: string, ogImage: string}} assets
 * @property {{bn: LocaleConfig, en: LocaleConfig}} locales
 * @property {ResourceEntry[]} resources
 * @property {{title: string, metaDescription: string, heading: string, lead: string, leadBangla: string, homeLabel: string, homeHref: string, projectLabel: string, projectHref: string}} notFound
 */

/** @type {SiteConfig} */
export const siteConfig = {
  siteUrl: "https://mohsin-bd.github.io",
  basePath: "/pedl-bricks-to-blocks-materials",
  themeColor: "#047857",
  backgroundColor: "#f0fdf4",
  updatedAt: "2026-03-09",
  app: {
    name: "PEDL: Bricks to Blocks",
    shortName: "PEDL B2B",
    description:
      "Materials and downloads for the PEDL Bricks to Blocks project.",
  },
  publisher: {
    name: "BIGD, BRAC University",
    url: "https://bigd.bracu.ac.bd/",
  },
  compiler: {
    name: "Md. Mohsin Hossain",
    url: "https://mdmohsinhossain.github.io/",
    email: "mohsin.hossain@bracu.ac.bd",
  },
  projectPageUrl:
    "https://bigd.bracu.ac.bd/study/bricks-to-blocks-information-and-coordination-challenges-for-transitioning-to-a-cleaner-building-technology/",
  assets: {
    favicon: "favicon.svg",
    appleTouchIcon: "assets/apple-touch-icon.png",
    icon192: "assets/icon-192.png",
    icon512: "assets/icon-512.png",
    ogImage: "assets/og-image.png",
  },
  locales: {
    bn: {
      key: "bn",
      htmlLang: "bn",
      localeCode: "bn_BD",
      outputPath: "index.html",
      publicPath: "/",
      title: "PEDL: ইট থেকে ব্লক - উপকরণ ও ডাউনলোড",
      metaDescription:
        "PEDL: ইট থেকে ব্লক প্রকল্পের উন্মুক্ত উপকরণ, ডাউনলোড এবং রেফারেন্স নথি এক জায়গায়।",
      skipLink: "মূল বিষয়বস্তুতে যান",
      heading: "PEDL: ইট থেকে ব্লক - উপকরণ ও ডাউনলোড",
      subheading: "মাঠ কর্মী, অংশীদার ও স্টেকহোল্ডারদের জন্য উন্মুক্ত ডাউনলোড",
      intro:
        "PEDL-অর্থায়িত এই গবেষণা প্রকল্পটি বুঝতে চায় যে নির্মাণ শ্রমিকদের কাছে স্বল্প-হস্তক্ষেপমূলক তথ্য সচেতনতা ও প্রশিক্ষণ সরকারি ও বেসরকারি খাতে নীতি গ্রহণ বৃদ্ধি করতে পারে কিনা, যা প্রচলিত ইট উৎপাদন থেকে টেকসই ব্লক উৎপাদনে রূপান্তরকে ত্বরান্বিত করবে এবং পরিচ্ছন্ন নির্মাণ প্রযুক্তি গ্রহণে তথ্য ও সমন্বয়ের চ্যালেঞ্জ মোকাবেলা করবে।",
      projectInfoLabel: "প্রকল্পের তথ্য ও পটভূমি:",
      repositoryHeading: "এই রিপোজিটরিতে কী আছে?",
      summaryLabel: "এই রিপোজিটরিতে কী আছে?",
      downloadsHeading: "ডাউনলোড",
      downloadsNote: "সব নথি সরাসরি ডাউনলোডযোগ্য এবং PDF ফরম্যাটে দেওয়া হয়েছে।",
      updatedLabel: "আপডেট:",
      compiledByLabel: "সংকলন:",
      compiledByRole: ", সিনিয়র রিসার্চ অ্যাসোসিয়েট",
      institution: "BIGD, BRAC University",
      footerContactPrefix: "মতামত জানাতে ইমেইল করুন:",
      footerContactSuffix: "। উৎস উল্লেখ করে পুনর্বণ্টন করা যাবে।",
      license: "লাইসেন্স: CC BY 4.0 (প্রস্তাবিত)",
      projectButtonLabel: "BIGD ওয়েবসাইটে প্রকল্প পৃষ্ঠা দেখুন",
      projectButtonTitle: "BIGD ওয়েবসাইটে প্রকল্প পৃষ্ঠা দেখুন",
      projectButtonAria: "BIGD-এ প্রকল্প পৃষ্ঠা দেখুন",
      navProjectLabel: "প্রকল্প পৃষ্ঠা",
      navProjectTitle: "BIGD-এ প্রকল্প পৃষ্ঠা দেখুন",
      navDownloadsLabel: "ডাউনলোড",
      navDownloadsTitle: "ডাউনলোড বিভাগে যান",
      languageSwitch: {
        label: "English",
        title: "ইংরেজি সংস্করণ খুলুন",
        ariaLabel: "ইংরেজি সংস্করণ খুলুন",
        lang: "en",
        href: "en/",
        hreflang: "en",
      },
      ogImageAlt: "PEDL Bricks to Blocks materials download page",
      twitterCardTitle: "PEDL: ইট থেকে ব্লক - উপকরণ ও ডাউনলোড",
      twitterCardDescription:
        "PEDL: ইট থেকে ব্লক প্রকল্পের উন্মুক্ত উপকরণ, ডাউনলোড এবং রেফারেন্স নথি এক জায়গায়।",
    },
    en: {
      key: "en",
      htmlLang: "en",
      localeCode: "en_US",
      outputPath: "en/index.html",
      publicPath: "/en/",
      title: "PEDL: Bricks to Blocks - Materials & Downloads",
      metaDescription:
        "Open PEDL materials, downloads, and reference documents in one place.",
      skipLink: "Skip to main content",
      heading: "PEDL: Bricks to Blocks - Materials & Downloads",
      subheading: "Open downloads for field teams, partners, and stakeholders",
      intro:
        "This research project funded by PEDL aims to understand if low-touch information awareness and training for construction workers can increase policy uptake in the government and non-government sectors to transition from traditional brick production to sustainable block manufacturing, while addressing information and coordination barriers to cleaner building technologies.",
      projectInfoLabel: "Project information and background:",
      repositoryHeading: "What is available in this repository?",
      summaryLabel: "What is available in this repository?",
      downloadsHeading: "Downloads",
      downloadsNote: "Each document is available as a direct PDF download.",
      updatedLabel: "Updated:",
      compiledByLabel: "Compiled by:",
      compiledByRole: ", Senior Research Associate",
      institution: "BIGD, BRAC University",
      footerContactPrefix: "For feedback, email:",
      footerContactSuffix: ". Redistribution is allowed with attribution.",
      license: "License: CC BY 4.0 (recommended)",
      projectButtonLabel: "View the project page on the BIGD website",
      projectButtonTitle: "View the project page on the BIGD website",
      projectButtonAria: "View the BIGD project page",
      navProjectLabel: "Project page",
      navProjectTitle: "View the BIGD project page",
      navDownloadsLabel: "Downloads",
      navDownloadsTitle: "Jump to the downloads section",
      languageSwitch: {
        label: "বাংলা",
        title: "Open the Bangla version",
        ariaLabel: "Open the Bangla version",
        lang: "bn",
        href: "../",
        hreflang: "bn-BD",
      },
      ogImageAlt: "PEDL Bricks to Blocks materials download page",
      twitterCardTitle: "PEDL: Bricks to Blocks - Materials & Downloads",
      twitterCardDescription:
        "Open PEDL materials, downloads, and reference documents in one place.",
    },
  },
  resources: [
    {
      id: "block-producer-list",
      sourcePath: "resources/2025-10-26 Block_Producers_List_MMH.pdf",
      downloadFileName: "pedl-block-producer-list.pdf",
      mediaType: "application/pdf",
      icon: "download",
      localeCopy: {
        bn: {
          title: "ব্লক উৎপাদনকারীদের তালিকা (PDF)",
          description: "সমন্বয় ও যোগাযোগের জন্য একত্রিত উৎপাদকদের তালিকা।",
          buttonLabel: "ব্লক উৎপাদনকারীদের তালিকা",
          buttonTitle: "ব্লক উৎপাদনকারীদের তালিকা ডাউনলোড করুন",
          buttonAria: "ব্লক উৎপাদনকারীদের তালিকা PDF ডাউনলোড করুন",
          buttonSrDescription:
            "PDF ডাউনলোড। ব্লক উৎপাদনকারীদের তালিকা ডাউনলোড করতে ক্লিক করুন।",
          metaLead: "সমন্বয় ও আউটরিচের জন্য একত্রিত তালিকা",
        },
        en: {
          title: "Block Producer List (PDF)",
          description:
            "A consolidated producer list for coordination and outreach.",
          buttonLabel: "Block Producer List",
          buttonTitle: "Download the Block Producer List PDF",
          buttonAria: "Download the Block Producer List PDF",
          buttonSrDescription:
            "PDF download. Activate to download the Block Producer List.",
          metaLead: "Consolidated list for coordination and outreach",
        },
      },
    },
    {
      id: "workshop-training-manual",
      sourcePath: "resources/Workshop_Training_Manual.pdf",
      downloadFileName: "pedl-workshop-training-manual.pdf",
      mediaType: "application/pdf",
      icon: "manual",
      localeCopy: {
        bn: {
          title: "ওয়ার্কশপ প্রশিক্ষণ ম্যানুয়াল (PDF)",
          description:
            "নীতিগত প্রেক্ষাপট ও ব্লক ব্যবহারের ওপর আলোচনা সহ প্রশিক্ষণ উপকরণ।",
          buttonLabel: "প্রশিক্ষণ ম্যানুয়াল",
          buttonTitle: "ওয়ার্কশপ প্রশিক্ষণ ম্যানুয়াল ডাউনলোড করুন",
          buttonAria: "ওয়ার্কশপ প্রশিক্ষণ ম্যানুয়াল PDF ডাউনলোড করুন",
          buttonSrDescription:
            "PDF ডাউনলোড। ওয়ার্কশপ প্রশিক্ষণ ম্যানুয়াল ডাউনলোড করতে ক্লিক করুন।",
          metaLead: "প্রেজেন্টেশন ও প্রশিক্ষণ উপকরণ",
        },
        en: {
          title: "Workshop Training Manual (PDF)",
          description:
            "Training materials covering policy context and practical block-use guidance.",
          buttonLabel: "Training Manual",
          buttonTitle: "Download the Workshop Training Manual PDF",
          buttonAria: "Download the Workshop Training Manual PDF",
          buttonSrDescription:
            "PDF download. Activate to download the Workshop Training Manual.",
          metaLead: "Presentation and training materials",
        },
      },
    },
    {
      id: "workshop-booklet",
      sourcePath: "resources/PEDL B2B Workshop Booklet.pdf",
      downloadFileName: "pedl-workshop-booklet.pdf",
      mediaType: "application/pdf",
      icon: "booklet",
      localeCopy: {
        bn: {
          title: "ওয়ার্কশপ বুকলেট (PDF)",
          description:
            "প্রশিক্ষণ উপকরণ ও অন্যান্য তথ্যসম্বলিত PEDL B2B ওয়ার্কশপ বুকলেট।",
          buttonLabel: "ওয়ার্কশপ বুকলেট",
          buttonTitle: "ওয়ার্কশপ বুকলেট ডাউনলোড করুন",
          buttonAria: "ওয়ার্কশপ বুকলেট PDF ডাউনলোড করুন",
          buttonSrDescription:
            "PDF ডাউনলোড। ওয়ার্কশপ বুকলেট ডাউনলোড করতে ক্লিক করুন।",
          metaLead: "ওয়ার্কশপ বুকলেট",
        },
        en: {
          title: "Workshop Booklet (PDF)",
          description:
            "PEDL B2B workshop booklet with training materials and supporting information.",
          buttonLabel: "Workshop Booklet",
          buttonTitle: "Download the Workshop Booklet PDF",
          buttonAria: "Download the Workshop Booklet PDF",
          buttonSrDescription:
            "PDF download. Activate to download the Workshop Booklet.",
          metaLead: "Workshop booklet",
        },
      },
    },
  ],
  notFound: {
    title: "Page Not Found | PEDL Materials",
    metaDescription:
      "The requested PEDL materials page could not be found. Return to the main downloads page or the project overview.",
    heading: "Page not found",
    lead: "This address does not match an existing PEDL materials page. Use the links below to return to the main downloads page or the project overview.",
    leadBangla:
      "এই ঠিকানায় কোনো সক্রিয় PEDL উপকরণ পাতা পাওয়া যায়নি। নিচের লিংক থেকে মূল ডাউনলোড পাতায় অথবা প্রকল্প পাতায় ফিরে যান।",
    homeLabel: "Return to downloads",
    homeHref: "./",
    projectLabel: "Open project page",
    projectHref:
      "https://bigd.bracu.ac.bd/study/bricks-to-blocks-information-and-coordination-challenges-for-transitioning-to-a-cleaner-building-technology/",
  },
};

export const homeLocaleKeys = ["bn", "en"];
