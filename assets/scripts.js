// Minimal site JS for accessibility, small behaviors and language toggle
document.addEventListener('DOMContentLoaded', function(){
  // Ensure skip link focuses main
  const skip = document.querySelector('.skip-link');
  if(skip){
    skip.addEventListener('click', function(){
      const main = document.getElementById('main');
      if(main){ main.setAttribute('tabindex','-1'); main.focus(); }
    });
  }

  // Improve keyboard focus for header nav items (links and buttons)
  const headerBtns = document.querySelectorAll('header nav a, header nav button');
  headerBtns.forEach(btn => btn.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); btn.click(); }
  }));

  // Simple i18n strings for Bengali (bn) and English (en)
  const i18n = {
    bn: {
      title: "PEDL: ইট থেকে ব্লক — উপকরণ",
      meta_description: "PEDL: ইট থেকে ব্লক — উন্মুক্ত উপকরণ: ব্লক উৎপাদনকারীদের তালিকা (PDF) ও ওয়ার্কশপ প্রশিক্ষণ ম্যানুয়াল (PDF)।",
      h1: "PEDL: ইট থেকে ব্লক — উপকরণ",
      sub: "মাঠকর্মী, অংশীদার ও স্টেকহোল্ডারদের জন্য উন্মুক্ত ডাউনলোড",
      skip_link: "মূল বিষয়বস্তুতে যান",
      "nav.project": "প্রকল্প পৃষ্ঠা",
      "nav.project_title": "BIGD-এ প্রকল্প পৃষ্ঠা দেখুন",
      "nav.downloads": "ডাউনলোড",
      "nav.downloads_title": "ডাউনলোড বিভাগে যান",
      lang_toggle: "English",
      lang_toggle_title: "ইংরেজি দেখুন",
      lang_toggle_aria: "ইংরেজি দেখুন",
      lang_toggle_sr: "(ভাষা)",
      intro_para1: "এই উদ্যোগটি প্রচলিত ইট উৎপাদন থেকে টেকসই ব্লক উৎপাদনে রূপান্তরকে সহজ করা এবং পরিচ্ছন্ন নির্মাণ প্রযুক্তি গ্রহণে তথ্য ও সমন্বয়ের চ্যালেঞ্জ মোকাবেলা করার লক্ষ্যে কাজ করে।",
      project_info_label: "প্রকল্পের তথ্য ও পটভূমি:",
      project_page_button: "BIGD ওয়েবসাইটে প্রকল্প পৃষ্ঠা দেখুন",
      summary: "এই রিপোজিটরিতে কী আছে?",
      bpl_title: "ব্লক উৎপাদনকারীদের তালিকা (PDF)",
      bpl_desc: "সমন্বয় ও যোগাযোগের জন্য একত্রিত উৎপাদকদের তালিকা।",
      manual_title: "ওয়ার্কশপ প্রশিক্ষণ ম্যানুয়াল (PDF)",
      manual_desc: "নীতিগত প্রেক্ষাপট ও ব্লক ব্যবহারের ওপর আলোচনা সহ প্রশিক্ষণ ম্যানুয়াল।",
      booklet_title: "ওয়ার্কশপ বুকলেট (PDF)",
      booklet_desc: "প্রশিক্ষণ উপকরণ ও অন্যান্য তথ্যসম্বলিত PEDL B2B ওয়ার্কশপ বুকলেট।",
      downloads: "ডাউনলোড",
      bpl_button: "ব্লক উৎপাদনকারীদের তালিকা",
      manual_button: "প্রশিক্ষণ ম্যানুয়াল",
      booklet_button: "ওয়ার্কশপ বুকলেট",
      bpl_desc_sr: "PDF ডাউনলোড। ব্লক উৎপাদনকারীদের তালিকা ডাউনলোড করতে ক্লিক করুন।",
      manual_desc_sr: "PDF ডাউনলোড। ওয়ার্কশপ প্রশিক্ষণ ম্যানুয়াল ডাউনলোড করতে ক্লিক করুন।",
      booklet_desc_sr: "PDF ডাউনলোড। ওয়ার্কশপ বুকলেট ডাউনলোড করতে ক্লিক করুন।",
      bpl_meta: "সমন্বয় ও যোগাযোগের জন্য একত্রিত তালিকা — ফরম্যাট: PDF — application/pdf • 275 KB • 1/27/2026",
      manual_meta: "প্রেজেন্টেশন ও প্রশিক্ষণ ম্যানুয়াল — ফরম্যাট: PDF — application/pdf • 19.9 MB • 1/27/2026",
      booklet_meta: "ওয়ার্কশপ বুকলেট — ফরম্যাট: PDF — application/pdf • 11.9 MB • 1/27/2026",
      meta_updated: "আপডেট: 2026-01-16",
      compiled_by: "সংকলন: <strong><a class=\"compiled-link\" href=\"https://mdmohsinhossain.github.io/\" target=\"_blank\" rel=\"noopener noreferrer\" data-i18n-aria=\"site_link_aria\">Md. Mohsin Hossain</a></strong>, সিনিয়র রিসার্চ অ্যাসোসিয়েট",
      footer_contact: "প্রতিক্রিয়া বা আপডেট সংস্করণ সম্পর্কে জানতে বা জানাতে ইমেইল করুন: <a href=\"mailto:mohsin.hossain@bracu.ac.bd\">mohsin.hossain@bracu.ac.bd</a>. উৎস উল্লেখ করে পুনর্বণ্টন করা যাবে।",      site_link: "Md. Mohsin Hossain",
      site_href: "https://mdmohsinhossain.github.io/",
      site_link_aria: "Md. Mohsin Hossain-এর ওয়েবসাইট খুলুন",
      license: "লাইসেন্স: CC BY 4.0 (প্রস্তাবিত)",
      bpl_aria: "ব্লক উৎপাদনকারীদের তালিকা ডাউনলোড করুন",
      manual_aria: "ওয়ার্কশপ প্রশিক্ষণ ম্যানুয়াল ডাউনলোড করুন",
      booklet_aria: "ওয়ার্কশপ বুকলেট ডাউনলোড করুন",
      project_page_aria: "BIGD-এ প্রকল্প পৃষ্ঠা দেখুন",
      email_aria: "ইমেইল করুন"
    },
    en: {
      title: "PEDL: Bricks to Blocks – Materials",
      meta_description: "Open materials for PEDL: Bricks to Blocks — Block Producer List and Workshop Training Manual Presentation.",
      h1: "PEDL: Bricks to Blocks – Materials",
      sub: "Open access downloads for field teams, partners, and stakeholders",
      skip_link: "Skip to main content",
      "nav.project": "Project page",
      "nav.project_title": "Project page on BIGD",
      "nav.downloads": "Downloads",
      "nav.downloads_title": "Jump to Downloads",
      lang_toggle: "বাংলা",
      lang_toggle_title: "বাংলা সংস্করণ দেখুন",
      lang_toggle_aria: "বাংলা সংস্করণ দেখুন",
      lang_toggle_sr: "(language)",
      intro_para1: "This initiative focuses on the transition from traditional brick production to sustainable block manufacturing, addressing information and coordination challenges in adopting cleaner building technologies.",
      project_info_label: "Project information and background:",
      project_page_button: "View project page on BIGD website",
      summary: "What's stored here in this repository?",
      bpl_title: "Block Producer List (PDF)",
      bpl_desc: "Consolidated list of producers for coordination and outreach.",
      manual_title: "Workshop Training Manual Presentation (PDF)",
      manual_desc: "Presentation and training manual — with discussion about the policy context and manual focused on block use.",
      booklet_title: "Workshop Booklet (PDF)",
      booklet_desc: "PEDL B2B Workshop booklet with training materials and resources.",
      downloads: "Downloads",
      bpl_button: "Block Producer List",
      manual_button: "Training Manual",
      booklet_button: "Workshop Booklet",
      bpl_desc_sr: "PDF download. Click to download the Block Producer List.",
      manual_desc_sr: "PDF download. Click to download the Workshop Training Manual.",
      booklet_desc_sr: "PDF download. Click to download the Workshop Booklet.",
      bpl_meta: "Consolidated list of producers for coordination and outreach — Format: PDF — application/pdf • 275 KB • 1/27/2026",
      manual_meta: "Presentation and training manual — Format: PDF — application/pdf • 19.9 MB • 1/27/2026",
      booklet_meta: "Workshop booklet with training materials and resources — Format: PDF — application/pdf • 11.9 MB • 1/27/2026",
      meta_updated: "Updated: 2026-01-16",
      compiled_by: "Compiled by: <strong><a class=\"compiled-link\" href=\"https://mdmohsinhossain.github.io/\" target=\"_blank\" rel=\"noopener noreferrer\" data-i18n-aria=\"site_link_aria\">Md. Mohsin Hossain</a></strong> Senior Research Associate",
      footer_contact: "For feedback or updated versions, please contact at <a href=\"mailto:mohsin.hossain@bracu.ac.bd\">mohsin.hossain@bracu.ac.bd</a>. You may redistribute with attribution.",
      site_link: "Md. Mohsin Hossain",
      site_href: "https://mdmohsinhossain.github.io/",
      site_link_aria: "Open Md. Mohsin Hossain's website",
      license: "License: CC BY 4.0 (recommended)",
      bpl_aria: "Download Block Producer List PDF",
      manual_aria: "Download Training Manual PDF",
      booklet_aria: "Download Workshop Booklet PDF",
      project_page_aria: "View project page on BIGD website",
      email_aria: "Email Mohsin Hossain"
    }
  };

  // Apply translations to elements with data-i18n-key and data-i18n-title
  function applyLang(lang){
    try{
      console.info('[i18n] Applying language:', lang);
      document.documentElement.lang = (lang === 'bn') ? 'bn' : 'en';
      // title
      if(i18n[lang].title){
        document.title = i18n[lang].title;
        const titleEl = document.querySelector('title[data-i18n-key="title"]');
        if(titleEl) titleEl.textContent = i18n[lang].title;
      }
      // meta description
      const meta = document.querySelector('meta[name="description"][data-i18n-key="meta_description"]');
      if(meta) meta.setAttribute('content', i18n[lang].meta_description);

      // update text and innerHTML (rich content allowed)
      let applied = 0;
      document.querySelectorAll('[data-i18n-key]').forEach(el=>{
        const key = el.dataset.i18nKey;
        if(i18n[lang][key] !== undefined){
          el.innerHTML = i18n[lang][key];
          applied++;
        }
      });
      console.debug('[i18n] Updated elements:', applied);

      // update element titles from data-i18n-title
      document.querySelectorAll('[data-i18n-title]').forEach(el=>{
        const key = el.dataset.i18nTitle;
        if(i18n[lang][key] !== undefined){
          el.setAttribute('title', i18n[lang][key]);
        }
      });

      // update aria-labels from data-i18n-aria
      document.querySelectorAll('[data-i18n-aria]').forEach(el=>{
        const key = el.dataset.i18nAria;
        if(i18n[lang][key] !== undefined){
          el.setAttribute('aria-label', i18n[lang][key]);
        }
      });

      // Update lang toggle text and aria-pressed
      const toggle = document.getElementById('lang-toggle');
      if(toggle){
        const sr = i18n[lang].lang_toggle_sr || '(language)';
        toggle.innerHTML = i18n[lang].lang_toggle + ' <span class="sr-only">' + sr + '</span>';
        toggle.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
        toggle.setAttribute('title', i18n[lang].lang_toggle_title || toggle.getAttribute('title'));
        // expose current lang on data attribute for easier debugging
        toggle.setAttribute('data-current-lang', lang);
      }
    }catch(err){
      console.error('[i18n] Error applying language', err);
    }
  }

  // Initialize language from localStorage (default bn)
  let lang = localStorage.getItem('siteLang') || 'bn';
  applyLang(lang);

  // Wire up the language toggle button (more robust)
  const langToggle = document.getElementById('lang-toggle');
  if(langToggle){
    langToggle.addEventListener('click', function(){
      // determine current language reliably
      const current = localStorage.getItem('siteLang') || document.documentElement.lang || 'bn';
      const newLang = (current === 'en') ? 'bn' : 'en';
      console.info('[i18n] Toggle clicked. switching', current, '->', newLang);
      localStorage.setItem('siteLang', newLang);
      lang = newLang; // keep local var in sync
      applyLang(newLang);
    });
    // ensure aria-label for the toggle exists and is translated
    // provide fallback if translation missing
    if(!langToggle.getAttribute('aria-label')){
      langToggle.setAttribute('aria-label', 'Toggle language');
    }
  }

});
