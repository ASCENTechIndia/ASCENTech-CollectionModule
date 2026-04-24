import { useState, useMemo } from "react";

// ─── CSV Export ───────────────────────────────────────────────────────────────

function exportToCSV(columns, data, filename = "export.csv") {
  const exportCols = columns.filter((c) => c.exportable !== false);
  const headers = exportCols.map((c) => c.label);
  const keys = exportCols.map((c) => c.key);

  const rows = data.map((row) =>
    keys.map((key) => {
      const val = row[key] ?? "";
      const str = String(val).replace(/"/g, '""');
      return str.includes(",") || str.includes('"') || str.includes("\n")
        ? `"${str}"`
        : str;
    })
  );

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Sort Icon ────────────────────────────────────────────────────────────────

function SortIcon({ active, dir }) {
  return (
    <span
      style={{
        marginLeft: 5,
        fontSize: "0.65em",
        opacity: active ? 1 : 0.25,
        transition: "opacity 0.15s",
      }}
    >
      {active ? (dir === 1 ? "▲" : "▼") : "⇅"}
    </span>
  );
}

// ─── Toolbar Styles ───────────────────────────────────────────────────────────

const T = {
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    padding: "14px 20px",
    borderBottom: "1px solid var(--bs-border-color, #e9ecef)",
    background: "var(--bs-card-bg, #fff)",
  },
  searchWrap: {
    position: "relative",
    flex: "1 1 200px",
    minWidth: "160px",
  },
  searchIcon: {
    position: "absolute",
    left: "11px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9aa0ac",
    fontSize: "0.8rem",
    pointerEvents: "none",
  },
  searchInput: {
    width: "100%",
    paddingLeft: "32px",
    paddingRight: "32px",
    height: "34px",
    fontSize: "0.83rem",
    border: "1px solid var(--bs-border-color, #dee2e6)",
    borderRadius: "8px",
    outline: "none",
    background: "var(--bs-body-bg, #f8f9fa)",
    color: "var(--bs-body-color, #212529)",
    transition: "border-color 0.15s, box-shadow 0.15s",
  },
  clearBtn: {
    position: "absolute",
    right: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    padding: "0 3px",
    cursor: "pointer",
    color: "#9aa0ac",
    fontSize: "0.85rem",
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
  },
  entriesWrap: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    flexShrink: 0,
  },
  entriesLabel: {
    fontSize: "0.8rem",
    color: "var(--bs-secondary-color, #6c757d)",
    whiteSpace: "nowrap",
  },
  entriesSelect: {
    height: "34px",
    padding: "0 28px 0 10px",
    fontSize: "0.83rem",
    border: "1px solid var(--bs-border-color, #dee2e6)",
    borderRadius: "8px",
    background: "var(--bs-body-bg, #f8f9fa)",
    color: "var(--bs-body-color, #212529)",
    cursor: "pointer",
    outline: "none",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%239aa0ac'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 9px center",
  },
  exportBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    height: "34px",
    padding: "0 14px",
    fontSize: "0.82rem",
    fontWeight: 500,
    border: "1px solid var(--bs-border-color, #dee2e6)",
    borderRadius: "8px",
    background: "var(--bs-body-bg, #f8f9fa)",
    color: "var(--bs-body-color, #212529)",
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
    transition: "background 0.15s, border-color 0.15s, color 0.15s",
  },
};

// ─── Flatten leaf columns from groups ────────────────────────────────────────

function flattenColumns(columnGroups) {
  return columnGroups.flatMap((group) => group.columns);
}

// ─── DataTableGrouped ─────────────────────────────────────────────────────────

/**
 * DataTableGrouped — two-level header table
 *
 * columnGroups shape
 * ──────────────────
 * [
 *   {
 *     label:      string,       // group header label (top row)
 *     colspan:    number,       // auto-calculated, no need to pass
 *     headerClass: string,      // optional class for group <th>
 *     columns: [                // leaf columns (bottom row)
 *       {
 *         key:         string,
 *         label:       string,
 *         sortable:    boolean,
 *         exportable:  boolean,
 *         searchable:  boolean,
 *         render:      (value, row) => JSX,
 *         headerClass: string,
 *         cellClass:   string,
 *         minWidth:    string,
 *       }
 *     ]
 *   }
 * ]
 */
 export function DataTableGrouped({
  title = "",
  subtitle = "",
  columnGroups = [],   // ← NEW: grouped column definitions
  data = [],
  defaultPerPage = 10,
  perPageOptions = [5, 10, 25, 50],
  csvFilename = "export.csv",
  onAddClick,
  addLabel = "Add",
  searchable = true,
  exportable = true,
  fontSize        = "0.78rem",   // ← NEW: override any time
  compactCells    = true,        // ← NEW: tighter padding
}) {
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(defaultPerPage);
  const [sortKey, setSortKey] = useState("");
  const [sortDir, setSortDir] = useState(1);
  const [page, setPage] = useState(1);
  const [exportHover, setExportHover] = useState(false);

  // Flat leaf columns derived from groups
  const columns = useMemo(() => flattenColumns(columnGroups), [columnGroups]);

  const searchKeys = columns
    .filter((c) => c.searchable !== false && c.exportable !== false)
    .map((c) => c.key);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) =>
      searchKeys.some((k) => String(row[k] ?? "").toLowerCase().includes(q))
    );
  }, [data, search]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      let va = a[sortKey] ?? "";
      let vb = b[sortKey] ?? "";
      if (typeof va === "string") va = va.toLowerCase();
      if (typeof vb === "string") vb = vb.toLowerCase();
      return va < vb ? -sortDir : va > vb ? sortDir : 0;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const safePage = Math.min(page, totalPages);
  const pageData = sorted.slice((safePage - 1) * perPage, safePage * perPage);
  const start = sorted.length === 0 ? 0 : (safePage - 1) * perPage + 1;
  const end = Math.min(safePage * perPage, sorted.length);

  const pageNumbers = useMemo(() => {
    const delta = 2;
    const range = [];
    for (
      let i = Math.max(1, safePage - delta);
      i <= Math.min(totalPages, safePage + delta);
      i++
    )
      range.push(i);
    return range;
  }, [safePage, totalPages]);

  function handleSort(col) {
    if (col.sortable === false) return;
    if (sortKey === col.key) setSortDir((d) => d * -1);
    else {
      setSortKey(col.key);
      setSortDir(1);
    }
    setPage(1);
  }

  function handleSearch(e) {
    setSearch(e.target.value);
    setPage(1);
  }
  function clearSearch() {
    setSearch("");
    setPage(1);
  }
  function handlePerPage(e) {
    setPerPage(Number(e.target.value));
    setPage(1);
  }

  return (
    <div className="card mt-3">

      {/* ── Card Header ── */}
      {title && (<div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title">{title}</h5>
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
        {onAddClick && (
          <button className="btn btn-primary btn-sm" onClick={onAddClick}>
            <i className="bi bi-plus-lg me-1"></i> {addLabel}
          </button>
        )}
      </div>)}
      

      {/* ── Toolbar ── */}
      {(searchable || exportable) && (
        <div style={T.toolbar}>
          {searchable && (
            <div style={T.searchWrap}>
              <span style={T.searchIcon}>
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search records..."
                value={search}
                onChange={handleSearch}
                style={T.searchInput}
                onFocus={(e) => {
                  e.target.style.borderColor = "#0d6efd";
                  e.target.style.boxShadow = "0 0 0 3px rgba(13,110,253,0.1)";
                  e.target.style.background = "var(--bs-body-bg, #fff)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor =
                    "var(--bs-border-color, #dee2e6)";
                  e.target.style.boxShadow = "none";
                  e.target.style.background = "var(--bs-body-bg, #f8f9fa)";
                }}
              />
              {search && (
                <button
                  style={T.clearBtn}
                  onClick={clearSearch}
                  title="Clear"
                >
                  <i className="bi bi-x-circle-fill"></i>
                </button>
              )}
            </div>
          )}

          <div style={{ flex: "1 1 0" }} />

          <div style={T.entriesWrap}>
            <span style={T.entriesLabel}>Show</span>
            <select
              value={perPage}
              onChange={handlePerPage}
              style={T.entriesSelect}
            >
              {perPageOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span style={T.entriesLabel}>entries</span>
          </div>

          {exportable && (
            <button
              style={{
                ...T.exportBtn,
                ...(exportHover
                  ? {
                      background: "#0d6efd",
                      color: "#fff",
                      borderColor: "#0d6efd",
                    }
                  : {}),
              }}
              onClick={() => exportToCSV(columns, sorted, csvFilename)}
              onMouseEnter={() => setExportHover(true)}
              onMouseLeave={() => setExportHover(false)}
              title="Export to CSV"
            >
              <i className="bi bi-download"></i>
              Export CSV
            </button>
          )}
        </div>
      )}

      {/* ── Table ── */}
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-bordered mb-0">
            <thead>

              {/* ── Row 1: Group headers ── */}
             {/* ── Row 1: Group headers ── */}
<tr style={{background: "#0ea5a4"}}>
  {columnGroups.map((group, gi) => (
    <th
      key={gi}
      colSpan={group.columns.length}
      className={group.headerClass || "text-center"}
      style={{
        background: "#0ea5a4",           // ← changed
        color: "#ffffff",                // ← added
        fontWeight: 600,
        fontSize: fontSize,
        letterSpacing: "0.02em",
        borderBottom: "2px solid #0ea5a4",  // ← match border to bg
        ...(compactCells ? { padding: "6px 8px" } : {}),
      }}
    >
      {group.label}
    </th>
  ))}
</tr>

              {/* ── Row 2: Leaf column headers ── */}
              <tr>
                {columns.map((col) => {
                  const isSortable = col.sortable !== false;
                  const isActive = sortKey === col.key;
                  return (
                    <th
                      key={col.key}
                      className={col.headerClass || "text-center"}
                      onClick={() => isSortable && handleSort(col)}
                      style={{
                        fontSize: fontSize, 
                        ...(compactCells ? { padding: "6px 8px" } : {}), 
                        ...(isSortable
                          ? { cursor: "pointer", userSelect: "none" }
                          : {}),
                        ...(col.minWidth ? { minWidth: col.minWidth } : {}),
                      }}
                    >
                      {col.label}
                      {isSortable && (
                        <SortIcon active={isActive} dir={sortDir} />
                      )}
                    </th>
                  );
                })}
              </tr>

            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center text-muted py-5"
                  >
                    <i className="bi bi-inbox fs-4 d-block mb-2 opacity-50"></i>
                    No records found
                  </td>
                </tr>
              ) : (
                pageData.map((row, rowIdx) => (
                  <tr key={row.id ?? rowIdx}>
                    {columns.map((col) => (
                      <td
                         key={col.key}
  className={col.cellClass || "text-center"}
  style={{
    fontSize: fontSize,          // ← NEW
    ...(compactCells ? { padding: "5px 8px" } : {}),   // ← NEW
    ...(col.minWidth ? { minWidth: col.minWidth } : {}),
  }}
                      >
                        {col.render
                          ? col.render(row[col.key], row)
                          : row[col.key] ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="card-footer d-flex justify-content-between align-items-center flex-wrap gap-2">
        <small className="text-muted">
          {sorted.length === 0
            ? "No records"
            : `Showing ${start} to ${end} of ${sorted.length} entries${
                data.length !== sorted.length
                  ? ` (filtered from ${data.length} total)`
                  : ""
              }`}
        </small>

        {totalPages > 1 && (
          <nav aria-label="Table pagination">
            <ul className="pagination pagination-sm mb-0">
              <li className={`page-item ${safePage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage(1)}
                  title="First"
                >
                  «
                </button>
              </li>
              <li className={`page-item ${safePage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage((p) => p - 1)}
                >
                  ‹
                </button>
              </li>

              {pageNumbers[0] > 1 && (
                <li className="page-item disabled">
                  <span className="page-link">…</span>
                </li>
              )}

              {pageNumbers.map((p) => (
                <li
                  key={p}
                  className={`page-item ${p === safePage ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => setPage(p)}>
                    {p}
                  </button>
                </li>
              ))}

              {pageNumbers[pageNumbers.length - 1] < totalPages && (
                <li className="page-item disabled">
                  <span className="page-link">…</span>
                </li>
              )}

              <li
                className={`page-item ${safePage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setPage((p) => p + 1)}
                >
                  ›
                </button>
              </li>
              <li
                className={`page-item ${safePage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setPage(totalPages)}
                  title="Last"
                >
                  »
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};