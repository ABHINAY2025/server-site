/**
 * Copy for the two legal screens, carried over from server-site's
 * privacy-policy and terms-of-service pages.
 *
 * Held as data rather than markup so both screens share one layout, and so the
 * contents rail can be built from the same source as the prose.
 */

export type Block =
  | { kind: 'p'; text: string }
  /** Statutory notices the source sets in capitals. Rendered in a boxed aside. */
  | { kind: 'notice'; text: string }
  | { kind: 'list'; items: string[] }

export type Section = {
  id: string
  heading: string
  blocks: Block[]
}

export type LegalDoc = {
  title: string
  updated?: string
  intro: Block[]
  sections: Section[]
}

export const PRIVACY: LegalDoc = {
  title: 'Privacy Policy',
  intro: [
    {
      kind: 'p',
      text: 'This privacy notice discloses the privacy practices for quantumdataleap.ai. This privacy notice applies solely to information collected by this website. It will notify you of the following:',
    },
  ],
  sections: [
    {
      id: 'what-we-collect',
      heading: 'What we collect',
      blocks: [
        {
          kind: 'list',
          items: [
            'What personally identifiable information is collected from you through the website, how it is used and with whom it may be shared.',
            'What choices are available to you regarding the use of your data.',
            'The security procedures in place to protect the misuse of your information.',
            'How you can correct any inaccuracies in the information.',
          ],
        },
      ],
    },
    {
      id: 'collection-use-sharing',
      heading: 'Information collection, use, and sharing',
      blocks: [
        {
          kind: 'p',
          text: 'We are the sole owners of the information collected on this site. We only have access to and collect information that you voluntarily give us via email or other direct contact from you. We will not sell or rent this information to anyone.',
        },
        {
          kind: 'p',
          text: 'We will use your information to respond to you, regarding the reason you contacted us. We will not share your information with any third party outside of our organization, other than as necessary to fulfil your request.',
        },
        {
          kind: 'p',
          text: 'Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products or services, or changes to this privacy policy.',
        },
      ],
    },
    {
      id: 'access-and-control',
      heading: 'Your access to and control over information',
      blocks: [
        {
          kind: 'p',
          text: 'You may opt out of any future contact from us at any time. You can do the following at any time by contacting us via the email address or phone number given on our website:',
        },
        {
          kind: 'list',
          items: [
            'See what data we have about you, if any.',
            'Change or correct any data we have about you.',
            'Have us delete any data we have about you.',
            'Express any concern you have about our use of your data.',
          ],
        },
      ],
    },
    {
      id: 'security',
      heading: 'Security',
      blocks: [
        {
          kind: 'p',
          text: 'We take precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline.',
        },
        {
          kind: 'p',
          text: 'Wherever we collect sensitive information, that information is encrypted and transmitted to us in a secure way.',
        },
        {
          kind: 'p',
          text: 'While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only employees who need the information to perform a specific job, for example billing or customer service, are granted access to personally identifiable information.',
        },
      ],
    },
    {
      id: 'contact',
      heading: 'Contact us',
      blocks: [
        {
          kind: 'p',
          text: 'If you feel that we are not abiding by this privacy policy, you should contact us immediately.',
        },
        {
          kind: 'p',
          text: 'For privacy concerns or requests, please reach out through the contact information provided on our website.',
        },
      ],
    },
  ],
}

export const TERMS: LegalDoc = {
  title: 'Terms of Service',
  updated: 'Updated 31 July 2026',
  intro: [
    {
      kind: 'p',
      text: 'Quantum Data Leap provides intelligent banking infrastructure, applying domain and technology innovation to accelerate business outcomes for financial institutions. Quantum Data Leap has created the website www.quantumdataleap.ai (the "Website") to showcase its payment intelligence capabilities. The Website is provided for informational purposes only by Quantum Data Leap.',
    },
    {
      kind: 'p',
      text: 'The use of any information, service, feature or content (the "Materials") on the Website or available through the Website by you as a user of the Website ("You") shall be governed by these terms of use ("Terms of Use"). By using the Website or viewing or downloading Materials from the Website, You hereby agree to abide by the terms and conditions set forth in these Terms of Use. In the event You do not agree to abide by the terms and conditions set forth in these Terms of Use, You are requested by Quantum Data Leap not to use the Website or view or download Materials from the Website.',
    },
  ],
  sections: [
    {
      id: 'ownership',
      heading: 'Ownership',
      blocks: [
        {
          kind: 'p',
          text: 'The Website, including all Materials developed by Quantum Data Leap, is the sole and exclusive property of Quantum Data Leap and is copyrighted and protected by worldwide copyright laws and treaty provisions. You hereby agree to comply with all copyright laws worldwide in your use of the Website and to prevent any unauthorized copying of the Materials. Quantum Data Leap does not grant any express or implied rights to the Website or any Materials whatsoever, including without limitation, under any patents, trademarks, copyrights or trade secret information, except as expressly permitted herein.',
        },
      ],
    },
    {
      id: 'limited-license',
      heading: 'Limited license',
      blocks: [
        {
          kind: 'p',
          text: 'Subject to the terms and conditions set forth in these Terms of Use, Quantum Data Leap grants You a non-exclusive, non-transferable, limited right to access, use and view the Website and the Materials. You agree not to interrupt or attempt to interrupt the operation of the Website in any manner. Unless otherwise specified, the Website is for your personal and non-commercial use. You shall not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software or services obtained from the Website.',
        },
      ],
    },
    {
      id: 'third-party-content',
      heading: 'Third party content',
      blocks: [
        {
          kind: 'p',
          text: 'The Website makes information of third parties available, including articles, analyst reports, news reports, tools to facilitate calculation, company information and data about financial markets, including any regulatory authority and other financial markets and other data from external sources (the "Third Party Content"). You acknowledge and agree that the Third Party Content is not created or endorsed by Quantum Data Leap. The provision of Third Party Content is for general informational purposes only and does not constitute a recommendation or solicitation to purchase or sell any securities or shares or to make any other type of investment or investment decision. In addition, the Website and the Third Party Content are not intended to provide tax, legal or investment advice. You acknowledge that the Third Party Content provided to you is obtained from sources believed to be reliable, but that no guarantees are made by Quantum Data Leap or the providers of the Third Party Content as to its accuracy, completeness or timeliness. You agree not to hold Quantum Data Leap, any business offering services through the Website or any provider of Third Party Content liable for any investment decision or other transaction You may make based on your reliance on or use of such data, or any liability that may arise due to delays or interruptions in the delivery of the Third Party Content for any reason.',
        },
        {
          kind: 'p',
          text: 'By using any Third Party Content, You may leave the Website and be directed to an external website, or to a website maintained by an entity other than Quantum Data Leap. If you decide to visit any such website, you do so at your own risk and it is your responsibility to take all protective measures to guard against viruses or any other destructive elements. Quantum Data Leap, including its subsidiaries, makes no warranty or representation regarding, and does not endorse, any linked websites or the information appearing thereon or any of the services described thereon. Links do not imply that Quantum Data Leap or the Website sponsors, endorses, is affiliated or associated with, or is legally authorized to use any trademark, trade name, logo or copyright symbol displayed in or accessible through the links, or that any linked site is authorized to use any trademark, trade name, logo or copyright symbol of Quantum Data Leap or any of its affiliates or subsidiaries. You hereby expressly acknowledge and agree that the linked sites are not under the control of Quantum Data Leap and Quantum Data Leap is not responsible for the contents of any linked site or any link contained in a linked site, or any changes or updates to such sites. Quantum Data Leap is not responsible for webcasting or any other form of transmission received from any linked site. Quantum Data Leap is providing these links to You only as a convenience and the inclusion of any link shall not be construed to imply endorsement by Quantum Data Leap.',
        },
      ],
    },
    {
      id: 'no-warranties',
      heading: 'No warranties',
      blocks: [
        {
          kind: 'notice',
          text: 'THE WEBSITE, THE MATERIALS ON THE WEBSITE AND ANY SOFTWARE MADE AVAILABLE ON THE WEBSITE, ARE PROVIDED "AS IS" WITHOUT ANY REPRESENTATION OR WARRANTY, EXPRESS OR IMPLIED, OF ANY KIND, INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY, NON INFRINGEMENT, OR FITNESS FOR ANY PARTICULAR PURPOSE. THERE IS NO WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, REGARDING THIRD PARTY CONTENT. IN SPITE OF QUANTUM DATA LEAP BEST ENDEAVOURS, THERE IS NO WARRANTY ON BEHALF OF QUANTUM DATA LEAP OR ANY OF ITS SUBSIDIARIES THAT THE WEBSITE WILL BE FREE OF ANY COMPUTER VIRUSES. SOME JURISDICTIONS DO NOT ALLOW FOR THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE EXCLUSIONS MAY NOT APPLY TO YOU.',
        },
      ],
    },
    {
      id: 'limitation-of-damages',
      heading: 'Limitation of damages',
      blocks: [
        {
          kind: 'notice',
          text: 'IN NO EVENT SHALL QUANTUM DATA LEAP OR ANY OF ITS SUBSIDIARIES OR AFFILIATES BE LIABLE TO ANY ENTITY FOR ANY DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL OR OTHER DAMAGES (INCLUDING, WITHOUT LIMITATION, ANY LOST PROFITS, BUSINESS INTERRUPTION, LOSS OF INFORMATION OR PROGRAMS OR OTHER DATA ON YOUR INFORMATION HANDLING SYSTEM) THAT ARE RELATED TO THE USE OF, OR THE INABILITY TO USE, THE CONTENT, MATERIALS, THIRD PARTY CONTENT AND FUNCTIONS OF THE WEBSITE OR ANY LINKED WEBSITE, EVEN IF QUANTUM DATA LEAP IS EXPRESSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.',
        },
      ],
    },
    {
      id: 'disclaimer',
      heading: 'Disclaimer',
      blocks: [
        {
          kind: 'notice',
          text: 'THE WEBSITE MAY CONTAIN INACCURACIES AND TYPOGRAPHICAL AND CLERICAL ERRORS. QUANTUM DATA LEAP EXPRESSLY DISCLAIMS ANY OBLIGATIONS TO UPDATE THE WEBSITE OR ANY OF THE MATERIALS ON THE WEBSITE. QUANTUM DATA LEAP DOES NOT WARRANT THE ACCURACY OR COMPLETENESS OF THE MATERIALS OR THE RELIABILITY OF ANY ADVICE, OPINION, STATEMENT OR OTHER INFORMATION DISPLAYED OR DISTRIBUTED THROUGH THE WEBSITE. YOU ACKNOWLEDGE THAT ANY RELIANCE ON ANY SUCH OPINION, ADVICE, STATEMENT, MEMORANDUM, OR INFORMATION SHALL BE AT YOUR SOLE RISK. QUANTUM DATA LEAP RESERVES THE RIGHT, IN ITS SOLE DISCRETION, TO CORRECT ANY ERRORS OR OMISSIONS IN ANY PORTION OF THE WEBSITE. QUANTUM DATA LEAP MAY MAKE ANY OTHER CHANGES TO THE WEBSITE, THE MATERIALS AND THE PROGRAMS, SERVICES OR PRICES DESCRIBED IN THE WEBSITE AT ANY TIME WITHOUT NOTICE. THE WEBSITE IS FOR INFORMATIONAL PURPOSES ONLY AND SHOULD NOT BE CONSTRUED AS TECHNICAL ADVICE OF ANY MANNER.',
        },
      ],
    },
    {
      id: 'posting',
      heading: 'Posting on the Website',
      blocks: [
        {
          kind: 'p',
          text: 'Quantum Data Leap does not claim ownership of the materials You provide to Quantum Data Leap, including feedback and suggestions, or post, upload, input or submit to any section of the Website (each a "Submission" and collectively "Submissions"). However, by posting, uploading, inputting, providing or submitting your Submissions, You are granting Quantum Data Leap, its affiliated companies and subsidiaries and necessary sub-licensees permission to use your Submission in connection with the operation of their internet businesses, including without limitation all services offered by Quantum Data Leap, including the license rights to copy, distribute, transmit, publicly display, publicly perform, reproduce, edit, translate and reformat your Submission, to publish your name in connection with your Submission, and the right to sublicense such rights to any other party.',
        },
        {
          kind: 'p',
          text: 'You hereby acknowledge and agree that no compensation shall be paid and no future commercial consideration has accrued with respect to the use of your Submission by Quantum Data Leap or any of its subsidiaries, as provided herein. Quantum Data Leap shall be under no obligation to post or use any Submission You may provide and Quantum Data Leap shall remove any Submission at any time at its own sole discretion.',
        },
        {
          kind: 'p',
          text: 'By posting a Submission, You hereby warrant and represent that You own or otherwise control all of the rights required under worldwide law for your Submission as described in these Terms of Use, including without limitation all the rights necessary for You to provide, post, upload, input or submit the Submissions.',
        },
      ],
    },
    {
      id: 'prohibited-use',
      heading: 'Unlawful and prohibited use of the Website',
      blocks: [
        {
          kind: 'p',
          text: 'As a condition of your use of the Website, You shall not use the Website for any purpose that is unlawful or prohibited by the Terms of Use. You shall not use the Website in any manner that could damage, disable, overburden, or impair any Quantum Data Leap server, including those of its subsidiaries, or the networks connected to any Quantum Data Leap server, or interfere with any other party’s use and enjoyment of any services associated with the Website. You shall not attempt to gain unauthorized access to any section of the Website, other accounts, computer systems or networks connected to any Quantum Data Leap server or to any of the services associated with the Website, through hacking, password mining or any other means. You shall not obtain or attempt to obtain any Materials or information through any means not intentionally made available through the Website.',
        },
      ],
    },
    {
      id: 'applicable-laws',
      heading: 'Applicable laws',
      blocks: [
        {
          kind: 'p',
          text: 'The Website is controlled by Quantum Data Leap from its offices within the United States of America. Quantum Data Leap makes no representation that Materials in the Website are appropriate or available for use in other locations and access to them from territories where their content is illegal is prohibited. Those who choose to access the Website from other locations do so on their own initiative and are responsible for compliance with applicable local laws. You may not use or export the Materials in violation of U.S. export laws and regulations. Any claim relating to the Materials shall be governed by the internal substantive laws of the Commonwealth of Massachusetts.',
        },
      ],
    },
    {
      id: 'indemnity',
      heading: 'Indemnity',
      blocks: [
        {
          kind: 'p',
          text: 'You agree to indemnify and hold harmless Quantum Data Leap, its subsidiaries and affiliates from any claim, cost, expense, liability, judgment, including all attorney fees and costs and related expenses, all court fees or other loss relating to your use of the Website in any manner, including without limitation any action You take which is in violation of the terms and conditions of these Terms of Use and against any applicable law.',
        },
      ],
    },
    {
      id: 'changes',
      heading: 'Changes',
      blocks: [
        {
          kind: 'p',
          text: 'Quantum Data Leap reserves the right, at its sole discretion, to change, modify, add or remove any portion of these Terms of Use in whole or in part, at any time. Changes in these Terms of Use will be effective when notice of such change is posted. Your continued use of the Website after any changes to these Terms of Use are posted will be considered acceptance of those changes. Quantum Data Leap may terminate, change, suspend or discontinue any aspect of the Website, including the availability of any features of the Website, at any time. Quantum Data Leap may also impose limits on certain features and services or restrict your access to certain sections or all of the Website without notice or liability. You hereby acknowledge and agree that Quantum Data Leap may terminate the authorization, rights and license given above at any point in time at its own sole discretion and, upon such termination, You shall immediately destroy all Materials.',
        },
      ],
    },
  ],
}
