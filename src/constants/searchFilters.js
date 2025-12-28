export const BASIC_FILTERS = [
  { label: "Semua", value: "all" },
  { label: "Judul", value: "title" },
  { label: "Pengarang", value: "author_name" },
  { label: "Subyek", value: "subject_name" },
  { label: "Jenis Bahan", value: "document_name" },
  { label: "ISBN/ISSN", value: "isbn" },
  { label: "Nomor Panggil", value: "call_num" },
  { label: "Pencarian Spesifik", value: "advanced" },
];

export const SEARCH_TYPES = {
  ALL: "all",
  BASIC: "basic",
  ADVANCED: "advanced",
};

export const INITIAL_ADVANCED_FILTERS = {
  title: "",
  author_name: "",
  subject_name: "",
  isbn: "",
  document_name: "",
  publisher_name: "",
  call_num: "",
  publication_year: "",
};
