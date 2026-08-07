import LegalLayout from '../components/LegalLayout'
import type { LegalDoc } from './legal-content'

/**
 * Data handling.
 *
 * The three questions a bank's security review asks first: where does it live,
 * do you train on it, and who can reach it. Answered plainly, because a vague
 * answer here ends the conversation.
 */
const DATA_HANDLING: LegalDoc = {
  title: 'Data handling',
  updated: 'For security review',
  intro: [
    {
      kind: 'p',
      text: 'Quantum Data Leap processes payment data on behalf of the institutions that operate it. This page sets out where that data resides, what it is used for, and who is able to reach it. It is written for security and compliance reviewers rather than as marketing copy.',
    },
  ],
  sections: [
    {
      id: 'residency',
      heading: 'Where data resides',
      blocks: [
        {
          kind: 'p',
          text: 'QDL is deployed within the boundary your institution chooses. It runs in your own cloud tenancy or data centre alongside the core, or in a single-tenant environment operated for you in United States regions. Data does not leave the region it was ingested in.',
        },
        {
          kind: 'list',
          items: [
            'Deployment options: in your tenancy, or single-tenant and operated for you.',
            'United States regions by default, with no cross-region replication unless you ask for it.',
            'No shared multi-tenant database. Each institution has its own isolated store.',
            'Backups inherit the residency of the environment that produced them.',
          ],
        },
      ],
    },
    {
      id: 'training',
      heading: 'Whether customer data is used for training',
      blocks: [
        {
          kind: 'p',
          text: 'Your data is not used to train models that serve anyone else. Models improve from outcomes inside your own environment, and those learned parameters stay there.',
        },
        {
          kind: 'list',
          items: [
            'No customer payment data is used to train shared or foundation models.',
            'No customer data is pooled across institutions for any purpose.',
            'Learning from outcomes happens within your deployment and remains in it.',
            'Where a third-party model is used in a deployment, it is named in the contract and configured with training on submitted data disabled.',
          ],
        },
      ],
    },
    {
      id: 'access',
      heading: 'Access controls and security',
      blocks: [
        {
          kind: 'p',
          text: 'Access is role based, logged and reviewable. Every change to a rule or a payment carries a maker and a checker, and the record of who did what is retained for the life of the agreement.',
        },
        {
          kind: 'list',
          items: [
            'Role based access control, with segregation of duties across fraud, compliance and rules.',
            'Single sign-on through SAML or OIDC, with multi-factor authentication enforced by your identity provider.',
            'Encryption in transit and at rest, using keys you can hold yourself.',
            'Maker and checker approval on every rule change, with a complete audit record.',
            'QDL staff have no standing access to production data. Support access is time-boxed, approved by you, and logged.',
          ],
        },
      ],
    },
    {
      id: 'retention',
      heading: 'Retention and deletion',
      blocks: [
        {
          kind: 'p',
          text: 'Retention periods are set by you to match your own regulatory obligations. On termination, data is deleted or returned in a documented format, and the deletion is evidenced.',
        },
      ],
    },
    {
      id: 'questions',
      heading: 'Security review',
      blocks: [
        {
          kind: 'p',
          text: 'For a completed security questionnaire, current certifications, penetration test summaries or a data processing agreement, write to support@quantumdataleap.ai and we will route it to the team that owns the answer.',
        },
      ],
    },
  ],
}

export default function DataHandling() {
  return <LegalLayout doc={DATA_HANDLING} />
}
