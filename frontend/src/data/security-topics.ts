export type SecurityTopic = {
  id: string;
  icon: string;
  title: string;
  description: string;
  category: string;
  details: string[];
  bestPractices: string[];
};

export const SECURITY_TOPICS: SecurityTopic[] = [
  {
    id: "authn",
    icon: "Fingerprint",
    title: "Authentication",
    description: "Verifying user identity through secure, multi-factor mechanisms.",
    category: "Identity",
    details: [
      "OAuth 2.0 with PKCE for secure authorization flows",
      "Multi-factor authentication (MFA) with TOTP and WebAuthn",
      "Passkey support for passwordless authentication",
      "Session management with secure cookie handling",
    ],
    bestPractices: [
      "Use established identity providers instead of custom auth",
      "Enforce strong password policies and MFA",
      "Implement account lockout after failed attempts",
      "Rotate secrets and tokens regularly",
    ],
  },
  {
    id: "authz",
    icon: "Lock",
    title: "Authorization",
    description: "Controlling access to resources based on user roles and permissions.",
    category: "Identity",
    details: [
      "Role-Based Access Control (RBAC) for standard permissions",
      "Attribute-Based Access Control (ABAC) for fine-grained policies",
      "Row-level security for multi-tenant data isolation",
      "API key scoping and permission boundaries",
    ],
    bestPractices: [
      "Apply principle of least privilege everywhere",
      "Centralize authorization logic in a policy engine",
      "Audit access logs for compliance and anomaly detection",
      "Test authorization boundaries with dedicated test suites",
    ],
  },
  {
    id: "data-protection",
    icon: "KeyRound",
    title: "Data Protection",
    description: "Encrypting data at rest and in transit to prevent unauthorized access.",
    category: "Data Security",
    details: [
      "AES-256 encryption for data at rest",
      "TLS 1.3 for all data in transit",
      "Field-level encryption for sensitive PII",
      "Key rotation with AWS KMS or HashiCorp Vault",
    ],
    bestPractices: [
      "Never store secrets in code or environment files",
      "Use managed secret stores for production credentials",
      "Encrypt database backups and snapshots",
      "Implement data masking for non-production environments",
    ],
  },
  {
    id: "input-validation",
    icon: "CheckSquare",
    title: "Input Validation",
    description: "Sanitizing and validating all user inputs to prevent injection attacks.",
    category: "Application Security",
    details: [
      "Server-side validation for all API endpoints",
      "Parameterized queries to prevent SQL injection",
      "Content Security Policy (CSP) headers for XSS prevention",
      "File upload scanning and type restrictions",
    ],
    bestPractices: [
      "Validate on the server, never trust client-side validation alone",
      "Use allowlists over blocklists for input filtering",
      "Escape output to prevent cross-site scripting",
      "Implement request size limits and rate limiting",
    ],
  },
  {
    id: "infrastructure",
    icon: "Server",
    title: "Infrastructure Security",
    description: "Hardening servers, networks, and cloud infrastructure against threats.",
    category: "Infrastructure",
    details: [
      "VPC configuration with private subnets and security groups",
      "Container image scanning and runtime protection",
      "SSH key management and bastion host access",
      "Cloud security posture management (CSPM)",
    ],
    bestPractices: [
      "Automate infrastructure hardening with IaC",
      "Regularly patch and update all dependencies",
      "Enable audit logging across all cloud services",
      "Implement network segmentation and zero-trust architecture",
    ],
  },
  {
    id: "compliance",
    icon: "ClipboardCheck",
    title: "Compliance & Governance",
    description: "Meeting regulatory requirements and maintaining security governance frameworks.",
    category: "Governance",
    details: [
      "SOC 2 Type II compliance implementation",
      "GDPR data handling and privacy by design",
      "HIPAA compliance for healthcare applications",
      "Regular security audits and penetration testing",
    ],
    bestPractices: [
      "Document all security policies and procedures",
      "Conduct regular risk assessments and threat modeling",
      "Maintain an incident response plan and runbooks",
      "Train all team members on security awareness",
    ],
  },
  {
    id: "monitoring",
    icon: "Radar",
    title: "Security Monitoring",
    description: "Detecting and responding to security threats in real-time.",
    category: "Operations",
    details: [
      "SIEM integration for centralized threat detection",
      "Intrusion detection and prevention systems (IDS/IPS)",
      "Vulnerability scanning in CI/CD pipelines",
      "Bug bounty programs for external security research",
    ],
    bestPractices: [
      "Set up automated alerts for suspicious activity",
      "Review access logs and audit trails regularly",
      "Run chaos engineering exercises for resilience",
      "Maintain a security incident response playbook",
    ],
  },
];

export const SECURITY_CATEGORIES = [...new Set(SECURITY_TOPICS.map((t) => t.category))];
