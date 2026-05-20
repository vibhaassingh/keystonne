/**
 * Resource library — spec sheets, CAD files, training, decks. All "downloads"
 * show a Demo-mode toast (Phase 1).
 */
export const resources = [
  {id: 'R-001', title: 'Refrigeration spec sheets (entire category)',     type: 'PDF', sizeMB: 2.4, tierMin: null,      tag: 'Spec'},
  {id: 'R-002', title: 'Cooking Ranges spec sheets',                       type: 'PDF', sizeMB: 1.8, tierMin: null,      tag: 'Spec'},
  {id: 'R-003', title: 'Walk-In Cold Room — CAD + BIM bundle',             type: 'DWG', sizeMB: 18.5, tierMin: 'Silver', tag: 'CAD'},
  {id: 'R-004', title: 'Commercial Kitchen Layout Templates (12 ventures)',type: 'DWG', sizeMB: 22.1, tierMin: 'Silver', tag: 'CAD'},
  {id: 'R-005', title: 'How to spec a cloud kitchen (training)',           type: 'MP4', sizeMB: 84.0, tierMin: null,      tag: 'Training'},
  {id: 'R-006', title: 'Commission programme deep dive (training)',        type: 'MP4', sizeMB: 62.5, tierMin: null,      tag: 'Training'},
  {id: 'R-007', title: 'Keystonne brand assets (logo, fonts)',             type: 'ZIP', sizeMB: 4.8, tierMin: null,      tag: 'Brand'},
  {id: 'R-008', title: 'Co-branded quote PDF template',                    type: 'PDF', sizeMB: 0.8, tierMin: 'Silver', tag: 'Brand'},
  {id: 'R-009', title: 'Client sales deck (2026)',                         type: 'PDF', sizeMB: 9.2, tierMin: null,      tag: 'Deck'},
  {id: 'R-010', title: 'Field-installation handbook',                      type: 'PDF', sizeMB: 6.3, tierMin: 'Gold',    tag: 'Field'},
];
