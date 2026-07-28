export interface StoredFile {
  id: string;
  name: string;
  sizeBytes: number;
  sizeFormatted: string;
  tool: string;
  date: string;
  isFav: boolean;
  isTrash: boolean;
  pages?: number;
  fileDataUrl?: string;
}

const STORAGE_KEY_FILES = 'pdfmaster_saved_files';
const STORAGE_KEY_HISTORY = 'pdfmaster_processing_history';

export function getSavedFiles(): StoredFile[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FILES);
    if (!raw) {
      const defaultInitialFiles: StoredFile[] = [
        { id: '1', name: 'Q3_Financial_Summary_2026.pdf', sizeBytes: 3565158, sizeFormatted: '3.40 MB', tool: 'Merge PDF', date: '2026-07-28 10:15', isFav: true, isTrash: false, pages: 12 },
        { id: '2', name: 'Vendor_Agreement_Final.pdf', sizeBytes: 1887436, sizeFormatted: '1.80 MB', tool: 'AI Summary', date: '2026-07-27 16:40', isFav: true, isTrash: false, pages: 6 },
        { id: '3', name: 'Product_Roadmap_Presentation.pdf', sizeBytes: 14889779, sizeFormatted: '14.20 MB', tool: 'Compress PDF', date: '2026-07-26 11:20', isFav: false, isTrash: false, pages: 28 },
        { id: '4', name: 'Architectural_Blueprint_Draft.pdf', sizeBytes: 8493465, sizeFormatted: '8.10 MB', tool: 'Watermark PDF', date: '2026-07-25 09:05', isFav: false, isTrash: false, pages: 15 },
      ];
      localStorage.setItem(STORAGE_KEY_FILES, JSON.stringify(defaultInitialFiles));
      return defaultInitialFiles;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveFileToStore(file: StoredFile) {
  if (typeof window === 'undefined') return;
  const current = getSavedFiles();
  const updated = [file, ...current];
  localStorage.setItem(STORAGE_KEY_FILES, JSON.stringify(updated));
}

export function toggleFavoriteInStore(id: string): StoredFile[] {
  if (typeof window === 'undefined') return [];
  const current = getSavedFiles();
  const updated = current.map(f => f.id === id ? { ...f, isFav: !f.isFav } : f);
  localStorage.setItem(STORAGE_KEY_FILES, JSON.stringify(updated));
  return updated;
}

export function moveToTrashInStore(id: string): StoredFile[] {
  if (typeof window === 'undefined') return [];
  const current = getSavedFiles();
  const updated = current.map(f => f.id === id ? { ...f, isTrash: true } : f);
  localStorage.setItem(STORAGE_KEY_FILES, JSON.stringify(updated));
  return updated;
}

export function deletePermanentlyInStore(id: string): StoredFile[] {
  if (typeof window === 'undefined') return [];
  const current = getSavedFiles();
  const updated = current.filter(f => f.id !== id);
  localStorage.setItem(STORAGE_KEY_FILES, JSON.stringify(updated));
  return updated;
}

export function calculateStorageUsedGB(files: StoredFile[]): string {
  const totalBytes = files.filter(f => !f.isTrash).reduce((sum, f) => sum + (f.sizeBytes || 0), 0);
  const gb = totalBytes / (1024 * 1024 * 1024);
  // Add 1.25GB base mock data for user view balance
  return (1.25 + gb).toFixed(2);
}
