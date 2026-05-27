-- Seed data for VILIKE FAB TECH (run after 001_schema.sql)

insert into financing_options (title, description, min_down_pct, max_tenure_months, interest_range, partner_bank, sort_order) values
('Unsecured Business Loan', 'Competitive interest vs nationalised banks.', 20, 60, '10.5% – 12.5%', 'Partner NBFC', 1),
('Secured Term Loan', 'Machine hypothecation with flexible EMI.', 25, 84, '9.5% – 11.5%', 'Nationalised Bank', 2),
('LC / Import Finance', 'For Xiamen factory purchase.', 30, 12, 'Bank LC terms', 'Import Finance Desk', 3),
('MSME / Subsidy Linked', 'State and central textile machinery schemes.', 15, 60, 'Subsidised', 'MSME Cell', 4);

insert into services (type, title, description, contact_phone) values
('crane', 'Crane & Rigging Service', 'Port unloading at Chennai and factory placement.', '8190908383'),
('installation', 'Installation & Commissioning', 'Trial run and operator training.', '8190905353'),
('amc', 'AMC & Spare Parts', 'Genuine Vilike spare parts from Tirupur.', '8190906363');

-- Sample MSN tracking number for demo: 9876543210
