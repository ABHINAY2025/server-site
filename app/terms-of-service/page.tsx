"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#3b094abd] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
            <p className="text-muted-foreground">
              Updated: September 26, 2023
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-6 text-foreground">
            {/* Introduction */}
            <div className="space-y-4">
              <p className="text-base leading-relaxed">
                Fisec Global Inc. is a global IT services provider which applies domain and technology innovation to accelerate business outcomes for our clients. Fisec has created the website www.fisecglobal.net (the "Website") to showcase Fisec Global Inc. global IT services capabilities, including those of its wholly and partly owned subsidiaries. The Website is provided for informational purposes only by Fisec Global Inc.
              </p>
              <p className="text-base leading-relaxed">
                The use of any information, service, feature or content (the "Materials") on the Website or available through the Website by you as a user of the Website ("You") shall be governed by these terms of use ("Terms of Use"). By using the Website or viewing or downloading Materials from the Website, You hereby agree to abide by the terms and conditions set forth in these Terms of Use. In the event of You do not agree to abide by the terms and conditions set forth in these Terms of Use, You are requested by Fisec Global Inc. not to use the Website or view or download Materials from the Website.
              </p>
            </div>

            {/* Ownership */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Ownership</h2>
              <p className="text-base leading-relaxed">
                The Website, including all Materials developed by Fisec Global Inc. is the sole and exclusive property of Fisec Global Inc. and is copyrighted and protected by worldwide copyright laws and treaty provisions. You hereby agree to comply with all copyright laws worldwide in your use of the Website and to prevent any unauthorized copying of the Materials. Fisec Global Inc. does not grant any express or implied rights to the Website or any Materials whatsoever, including without limitation, under any patents, trademarks, copyrights or trade secret information, except as expressly permitted herein.
              </p>
            </div>

            {/* Limited License */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Limited License</h2>
              <p className="text-base leading-relaxed">
                Subject to the terms and conditions set forth in these Terms of Use, Fisec Global Inc. grants You a non-exclusive, non-transferable, limited right to access, use and view the Website and the Materials. You agree not to interrupt or attempt to interrupt the operation of the Website in any manner. Unless otherwise specified, the Website is for your personal and non-commercial use. You shall not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, services obtained from the Website.
              </p>
            </div>

            {/* Third Party Content */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Third Party Content</h2>
              <p className="text-base leading-relaxed">
                The Website makes information of third parties available, including articles, analyst reports, news reports, tools to facilitate calculation, company information and data about financial markets, including any regulatory authority and other financial markets and other data from external sources (the "Third Party Content"). You acknowledge and agree that the Third Party Content is not created or endorsed by Fisec Global Inc. The provision of Third Party Content is for general informational purposes only and does not constitute a recommendation or solicitation to purchase or sell any securities or shares or to make any other type of investment or investment decision. In addition, the Website or the Third Party Content is not intended to provide tax, legal or investment advice. You acknowledge that the Third Party Content provided to you is obtained from sources believed to be reliable, but that no guarantees are made by Fisec Global Inc. or the providers of the Third Party Content as to its accuracy, completeness, timeliness. You agree not to hold Fisec Global Inc., any business offering services through the Website or any provider of Third Party Content liable for any investment decision or other transaction You may make based on your reliance on or use of such data, or any liability that may arise due to delays or interruptions in the delivery of the Third Party Content for any reason.
              </p>
              <p className="text-base leading-relaxed">
                By using any Third Party Content, You may leave the Website and be directed to an external website, or to a website maintained by an entity other than Fisec Global Inc. If you decide to visit any such website, you do so at your own risk and it is your responsibility to take all protective measures to guard against viruses or any other destructive elements. Fisec Global Inc. (including its subsidiaries) makes no warranty or representation regarding, and does not endorse, any linked Websites or the information appearing thereon or any of the services described thereon. Links do not imply that Fisec Global Inc. or the Website sponsors, endorses, is affiliated or associated with, or is legally authorized to use any trademark, trade name, logo or copyright symbol displayed in or accessible through the links, or that any linked site is authorized to use any trademark, trade name, logo or copyright symbol of Fisec Global Inc. or any of its affiliates or subsidiaries. You hereby expressly acknowledge and agree that the linked sites are not under the control of Fisec Global Inc. and Fisec Global Inc. is not responsible for the contents of any linked site or any link contained in a linked site, or any changes or updates to such sites. Fisec Global Inc. is not responsible for webcasting or any other form of transmission received from any linked site. Fisec Global Inc. is providing these links to You only as a convenience and the inclusion of any link shall not be construed to imply endorsement by Fisec Global Inc.
              </p>
            </div>

            {/* No Warranties */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">No Warranties</h2>
              <p className="text-base leading-relaxed font-medium">
                THE WEBSITE, THE MATERIALS ON THE WEBSITE AND ANY SOFTWARE MADE AVAILABLE ON THE WEBSITE, ARE PROVIDED "AS IS" WITHOUT ANY REPRESENTATION OR WARRANTY, EXPRESS OR IMPLIED, OF ANY KIND, INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY, NON INFRINGEMENT, OR FITNESS FOR ANY PARTICULAR PURPOSE. THERE IS NO WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, REGARDING THIRD PARTY CONTENT. IN SPITE OF FISEC GLOBAL INC. BEST ENDEAVOURS, THERE IS NO WARRANTY ON BEHALF OF FISEC GLOBAL INC. OR ANY OF ITS SUBSIDIARIES THAT THE WEBSITE WILL BE FREE OF ANY COMPUTER VIRUSES. SOME JURISDICTIONS DO NOT ALLOW FOR THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE EXCLUSIONS MAY NOT APPLY TO YOU.
              </p>
            </div>

            {/* Limitation of Damages */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Limitation of Damages</h2>
              <p className="text-base leading-relaxed font-medium">
                IN NO EVENT SHALL FISEC GLOBAL INC. OR ANY OF ITS SUBSIDIARIES OR AFFILIATES BE LIABLE TO ANY ENTITY FOR ANY DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL OR OTHER DAMAGES (INCLUDING, WITHOUT LIMITATION, ANY LOST PROFITS, BUSINESS INTERRUPTION, LOSS OF INFORMATION OR PROGRAMS OR OTHER DATA ON YOUR INFORMATION HANDLING SYSTEM) THAT ARE RELATED TO THE USE OF, OR THE INABILITY TO USE, THE CONTENT, MATERIALS, THIRD PARTY CONTENT AND FUNCTIONS OF THE WEBSITE OR ANY LINKED WEBSITE, EVEN IF FISEC GLOBAL INC. IS EXPRESSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Disclaimer</h2>
              <p className="text-base leading-relaxed font-medium">
                THE WEBSITE MAY CONTAIN INACCURACIES AND TYPOGRAPHICAL AND CLERICAL ERRORS. FISEC GLOBAL INC. EXPRESSLY DISCLAIMS ANY OBLIGATION(S) TO UPDATE THE WEBSITE OR ANY OF THE MATERIALS ON THE WEBSITE. FISEC GLOBAL INC. DOES NOT WARRANT THE ACCURACY OR COMPLETENESS OF THE MATERIALS OR THE RELIABILITY OF ANY ADVICE, OPINION, STATEMENT OR OTHER INFORMATION DISPLAYED OR DISTRIBUTED THROUGH THE WEBSITE. YOU ACKNOWLEDGE THAT ANY RELIANCE ON ANY SUCH OPINION, ADVICE, STATEMENT, MEMORANDUM, OR INFORMATION SHALL BE AT YOUR SOLE RISK. FISEC GLOBAL INC. RESERVES THE RIGHT, IN ITS SOLE DISCRETION, TO CORRECT ANY ERRORS OR OMISSIONS IN ANY PORTION OF THE WEBSITE. FISEC GLOBAL INC. MAY MAKE ANY OTHER CHANGES TO THE WEBSITE, THE MATERIALS AND THE PROGRAMS, SERVICES OR PRICES (IF ANY) DESCRIBED IN THE WEBSITE AT ANY TIME WITHOUT NOTICE. THE WEBSITE IS FOR INFORMATIONAL PURPOSES ONLY AND SHOULD NOT BE CONSTRUED AS TECHNICAL ADVICE OF ANY MANNER.
              </p>
            </div>

            {/* Posting on the Website */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Posting on the Website</h2>
              <p className="text-base leading-relaxed">
                Fisec Global Inc. does not claim ownership of the materials You provide to Fisec Global Inc. (including feedback and suggestions) or post, upload, input or submit to any section of the Website (each a "Submission" and collectively "Submissions"). However, by posting, uploading, inputting, providing or submitting ("Posting") your Submissions, You are granting Fisec Global Inc., its affiliated companies and subsidiaries and necessary sub-licensees permission to use your Submission in connection with the operation of their Internet businesses (including, without limitation, all services offered by Fisec Global Inc.), including, without limitation, the license rights to: copy, distribute, transmit, publicly display, publicly perform, reproduce, edit, translate and reformat your Submission; to publish your name in connection with your Submission; and the right to sublicense such rights to any other party.
              </p>
              <p className="text-base leading-relaxed">
                You hereby acknowledge and agree that no compensation shall be paid or no future commercial consideration has accrued with respect to the use of your Submission by Fisec Global Inc. or any of its subsidiaries, as provided herein. Fisec Global Inc. shall be under no obligation to post or use any Submission You may provide and Fisec Global Inc. shall remove any Submission at any time at its own sole discretion.
              </p>
              <p className="text-base leading-relaxed">
                By Posting a Submission, You hereby warrant and represent that You own or otherwise control all of the rights required under worldwide law for your Submission as described in these Terms of Use including, without limitation, all the rights necessary for You to provide, post, upload, input or submit the Submissions.
              </p>
            </div>

            {/* Unlawful and/or Prohibited Use */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Unlawful and/or Prohibited Use of the Website</h2>
              <p className="text-base leading-relaxed">
                As a condition of your use of the Website, You shall not use the Website for any purpose(s) that is unlawful or prohibited by the Terms of Use. You shall not use the Website in any manner that could damage, disable, overburden, or impair any Fisec Global Inc. (including its subsidiaries) server, or the network(s) connected to any Fisec Global Inc. (including its subsidiaries) server, or interfere with any other party's use and enjoyment of any services associated with the Website. You shall not attempt to gain unauthorized access to any section of the Website, other accounts, computer systems or networks connected to any Fisec Global Inc. server or to any of the services associated with the Website, through hacking, password mining or any other means. You shall not obtain or attempt to obtain any Materials or information through any means not intentionally made available through the Website.
              </p>
            </div>

            {/* Applicable Laws */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Applicable Laws</h2>
              <p className="text-base leading-relaxed">
                The Website is controlled by Fisec Global Inc. from its offices within the United States of America. Fisec Global Inc. makes no representation that Materials in the Website are appropriate or available for use in other locations and access to them from territories where their content is illegal is prohibited. Those who choose to access the Website from other locations do so on their own initiative and are responsible for compliance with applicable local laws. You may not use or export the Materials in violation of U.S. export laws and regulations. Any claim relating to the Materials shall be governed by the internal substantive laws of the Commonwealth of Massachusetts.
              </p>
            </div>

            {/* Indemnity */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Indemnity</h2>
              <p className="text-base leading-relaxed">
                You agree to indemnify and hold harmless Fisec Global Inc., its subsidiaries and affiliates from any claim, cost, expense, liability, judgment, including all attorney fees and costs and related expenses, all court fees or other loss relating to your use of the Website in any manner, including without limitation of the foregoing, any action You take which is in violation of the terms and conditions of these Terms of Use and against any applicable law.
              </p>
            </div>

            {/* Changes */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold">Changes</h2>
              <p className="text-base leading-relaxed">
                Fisec Global Inc. reserves the rights, at its sole discretion, to change, modify, add or remove any portion of these Terms of Use in whole or in part, at any time. Changes in these Terms of Use will be effective when notice of such change is posted. Your continued use of the Website after any changes to these Terms of Use are posted will be considered acceptance of those changes. Fisec Global Inc. may terminate, change, suspend or discontinue any aspect of the Website, including the availability of any feature(s) of the Website, at any time. Fisec Global Inc. may also impose limits on certain features and services or restrict your access to certain sections or all of the Website without notice or liability. You hereby acknowledge and agree that Fisec Global Inc. may terminate the authorization, rights and license given above at any point of time at its own sole discretion and, upon such termination, You shall immediately destroy all Materials.
              </p>
            </div>
          </div>

          {/* Footer Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-t border-border pt-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#3b094abd] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
