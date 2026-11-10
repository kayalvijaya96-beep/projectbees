# ProjectBee — Super Admin Product Requirements Document

**Version:** 1.0  
**Model:** Option A — Single Super Admin  
**Authority:** Complete platform control

## 1. Purpose
The Super Admin Console is the highest-privilege management interface for ProjectBee. There is one active Super Admin identity. It manages Admin access, permissions, global configuration and oversight. Admins may act independently within assigned permissions; no routine approval workflow is required. Super Admin reviews actions through audit logs.

## 2. Single Super Admin invariant
- Exactly one active Super Admin identity is permitted.
- Public signup is prohibited.
- Bootstrap/provisioning must be a controlled server-side operation.
- Ordinary Admins cannot create, promote or replace a Super Admin.
- Prevent accidental deletion or deactivation through ordinary application workflows.
- Provide a documented secure recovery procedure.
- Enforce the invariant in backend/database logic, not only the UI.

## 3. Authentication and security
- Privileged authentication must use the approved secure identity provider.
- Enable MFA for Super Admin where supported.
- Use short-lived sessions and reauthentication for especially sensitive operations where appropriate.
- Never expose service-role keys, database passwords or provider secrets in the UI.
- Log sensitive access and configuration changes.
- Support secure session revocation and credential rotation procedures.

## 4. Admin account management
Super Admin can:
- Invite/provision Admins.
- Activate, suspend and deactivate Admin accounts.
- View Admin status and last activity where available.
- Assign and revoke roles/permissions.
- Review permission assignments.
- Prevent self-escalation by Admins.
- Revoke access promptly when staff leave or duties change.

## 5. Permission management
- Manage a centrally defined permission catalogue.
- Assign permissions to Admins or roles.
- Follow least privilege.
- Separate read, create, edit, publish, archive, export and destructive permissions.
- Review the effective permissions for each Admin.
- Record every permission change in the audit log.
- No Admin approval workflow is required for actions within assigned permissions.

## 6. Global platform settings
Manage validated settings such as:
- Store name and approved contact details.
- Catalogue defaults and visibility settings.
- Operational configuration.
- Feature flags.
- Order/fulfilment configuration.
- Notification templates and provider configuration references.

Sensitive secrets must be stored in server-side secret management, not ordinary database settings or frontend-readable configuration. Validate setting types, ranges and allowed values.

## 7. Audit log oversight
Super Admin can search and filter audit events by:
- Actor/Admin.
- Action and permission.
- Resource type and identifier.
- Date/time range.
- Outcome where recorded.

Audit events should include actor, action, resource, timestamp, request/correlation ID and safe before/after metadata. Exclude passwords, OTPs, tokens, secrets and unnecessary child personal data.

Ordinary Admins cannot edit or delete audit records. Use append-only controls and restrict database-level access.

## 8. System health and integrations
Provide safe operational visibility into:
- Application/API health.
- Supabase connectivity and service status where available.
- Email OTP provider status.
- WhatsApp provider status.
- Storage usage and operational errors.
- Background task/webhook failures.

Do not display provider secrets. Health indicators should not imply a provider is functioning merely because credentials exist.

## 9. Data governance
- Review retention and deletion settings.
- Review privileged access to customer data.
- Review export activity.
- Ensure data minimization and privacy controls remain in place.
- Support legally reviewed privacy request workflows.
- Do not use the console to bypass customer privacy rights.

## 10. Security and emergency controls
- Revoke a compromised Admin's access.
- Revoke sessions where supported.
- Disable a feature or integration safely.
- Trigger credential rotation procedures through approved infrastructure controls.
- Preserve audit evidence during incidents.
- Emergency actions must themselves be recorded.

## 11. Acceptance criteria
- Only the single configured Super Admin can access Super Admin endpoints.
- Admins cannot access or modify Super Admin controls.
- Admin invitations, activation and permission changes are enforced server-side.
- Admins can perform permitted work without approval.
- Audit logs capture privileged actions and are tamper-resistant to ordinary application roles.
- Sensitive configuration is not exposed.
- Recovery and incident procedures are documented and tested.
