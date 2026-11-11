const notesCache = new Map();

export const invalidateNotesCache = (key) => {
  notesCache.delete(key);
};

export const fetchNotesWithCache = (key, fetchNotes, refresh = false) => {
  const cachedEntry = notesCache.get(key);

  if (cachedEntry?.promise) {
    if (!refresh || cachedEntry.isRefresh) return cachedEntry.promise;
    if (cachedEntry.refreshPromise) return cachedEntry.refreshPromise;

    const refreshPromise = cachedEntry.promise.then(() =>
      fetchNotesWithCache(key, fetchNotes, true)
    );
    cachedEntry.refreshPromise = refreshPromise;
    return refreshPromise.finally(() => {
      if (cachedEntry.refreshPromise === refreshPromise) {
        cachedEntry.refreshPromise = null;
      }
    });
  }

  if (cachedEntry && !refresh) {
    return Promise.resolve(cachedEntry.notes);
  }

  const entry = {
    notes: cachedEntry?.notes,
    promise: null,
    refreshPromise: null,
    isRefresh: refresh,
  };
  const request = Promise.resolve()
    .then(fetchNotes)
    .then((response) => {
      const notes = Array.isArray(response) ? response : response?.notes;
      if (!Array.isArray(notes)) {
        throw new Error("Notes response must contain a notes array.");
      }
      entry.notes = notes;
      return notes;
    })
    .catch((error) => {
      if (entry.notes === undefined && notesCache.get(key) === entry) {
        notesCache.delete(key);
      }
      throw error;
    })
    .finally(() => {
      entry.promise = null;
    });
  entry.promise = request;
  notesCache.set(key, entry);
  return request;
};
