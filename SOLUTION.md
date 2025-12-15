# Solution Notes (WIP)

> **Status:** 🚧 Work in Progress

This document briefly explains what was built and the main design choices made.

---

## What I’ve Done

1. **Centralized product logic in a ProductService**
   All product data, filtering, sorting, and favorites live in one service to keep components simple.

2. **Used reactive state with RxJS**
   I used `BehaviorSubject` and `combineLatest` so the UI updates automatically when search, filters, or sorting change.

3. **Handled search, filter, and sort on the client**
   This keeps the app easy to understand and fast for small datasets, but it wouldn’t scale well for large data.

4. **Persisted favorites using localStorage**
   Favorites survive page refreshes without needing a backend.

5. **Used CSS Grid for layout and styling**
   Grid makes it easier to build clean, responsive layouts, though it can be overkill for very simple layouts.

---

These choices focus on **simplicity, clarity, and speed of development**, with room to evolve as the app grows.
