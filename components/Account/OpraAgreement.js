import React, { forwardRef, useRef } from "react";

import Modal from "../_common/Modal";

const Component = forwardRef(({ fullName, clickAgree }, ref) => {
  const _content = useRef(null);

  return (
    <Modal ref={ref} className="opra-agreement">
      <div className="data">
        <div className="scrolled">
          <div ref={_content}>
            <h1>Electronic Subscriber Agreement </h1>
            <h2>
              OPTIONS PRICE REPORTING AUTHORITY
              <br />
              ELECTRONIC FORM OF SUBSCRIBER AGREEMENT
            </h2>
            <p>
              IMPORTANT NOTICE: THIS SUBSCRIBER AGREEMENT (THIS “AGREEMENT”) IS
              AN AGREEMENT BETWEEN YOU AND <b>Lantern Finance Inc. </b> FOR YOU
              TO RECEIVE INFORMATION PUBLISHED BY THE OPTIONS PRICE REPORTING
              AUTHORITY, LLC (“OPRA”). PLEASE READ THIS AGREEMENT CAREFULLY.
              AFTER YOU HAVE READ THIS AGREEMENT, PLEASE INDICATE YOUR AGREEMENT
              TO BE BOUND BY ITS TERMS AND CONDITIONS BY CLICKING ON THE “I
              AGREE” BUTTON AT THE END. IF YOU DO NOT AGREE TO THESE TERMS AND
              CONDITIONS, YOU WILL BE UNABLE TO RECEIVE THE INFORMATION.
            </p>
            <p>
              By completing and submitting this Agreement, you are applying to
              receive from{" "}
              <b>
                Lantern Finance Inc. 7 Nelson Circle Middleton MA 01949,
                legal@uselantern.com
              </b>{" "}
              (“Vendor”) a market data service (the “Service”) providing access
              to current options last sale and quotation information and related
              information (“OPRA Data”) published by OPRA pursuant to a Plan
              declared effective by the Securities and Exchange Commission. The
              parties to this Plan (each, an “OPRA Participant”) are those
              national securities exchanges that are from time to time approved
              by the Securities and Exchange Commission for the trading of
              securities options. In reviewing and approving this Agreement,
              Vendor is authorized to act on behalf of OPRA. The person who acts
              from time to time as data processor on behalf of OPRA is referred
              to herein as “OPRA’s Processor.”
            </p>
            <p>
              By completing and submitting this Agreement and clicking on the “I
              agree” button at the end of this Agreement, you are consenting to
              enter into this Agreement in electronic form. You have the right
              to withdraw your consent by terminating this Agreement and your
              receipt of the OPRA Data. Your right to terminate this Agreement
              and your receipt of the OPRA Data, and the procedure you must
              follow to do so, are described in paragraph 6 below. If any
              information needed to contact you electronically changes, the
              procedure for notifying Vendor is described in paragraph 11 below.
              If you wish to have a copy of this Agreement in paper form and you
              are unable to print a copy on your own computer system, Vendor
              will provide you with a paper copy at no charge upon its receipt
              of your request transmitted as described in paragraph 11. You may
              access a copy of this Agreement electronically at no charge, if
              your access to OPRA Data is from a device capable of receiving
              text, by{" "}
              <b>
                either visiting the Opraplan site or emailing us for your signed
                agreement
              </b>
              .
            </p>
            <p>
              This Agreement includes an “Addendum for Nonprofessionals.” The
              term “Nonprofessional” is defined in the Addendum. The purpose of
              the Addendum is to determine whether you are a Nonprofessional
              under this definition. If you are a Nonprofessional under this
              definition, OPRA’s charges to Vendor for your use of the OPRA Data
              are subject to a cap, and you may be entitled to pay lower fees to
              Vendor. You do not need to complete the Addendum, but if you do
              not do so, or if you cannot agree with all of the statements in
              the Addendum, OPRA will not consider you to be a Nonprofessional.
            </p>
            <p>You hereby represent and agree as follows:</p>
            <ol>
              <li>
                Your full name is: <b>{fullName}</b>
              </li>
              <li>
                You shall receive the Service and the OPRA Data included therein
                solely for your own business or personal use, and you shall not
                retransmit or otherwise furnish the OPRA Data to any person,
                other than your own employees on devices that are subject to the
                control of Vendor. If you are a Nonprofessional and have
                completed the Addendum for Nonprofessionals, you are only
                permitted under this Agreement to use the OPRA Data for the
                investment activities described in the Addendum for
                Nonprofessionals.
              </li>
              <li>
                You acknowledge that OPRA Data is and shall remain the property
                of the OPRA Participant on which a reported transaction took
                place or a reported quotation was entered.
              </li>
              <li>
                DISCLAIMER OF LIABILITY -- NEITHER VENDOR, OPRA, OPRA’S
                PROCESSOR NOR ANY OPRA PARTICIPANT GUARANTEES THE TIMELINESS,
                SEQUENCE, ACCURACY OR COMPLETENESS OF ANY OF THE OPRA DATA
                SUPPLIED TO YOU HEREUNDER AND NEITHER VENDOR, OPRA, OPRA’S
                PROCESSOR NOR ANY OPRA PARTICIPANT SHALL BE LIABLE IN ANY WAY,
                TO YOU OR TO ANY OTHER PERSON, FOR ANY LOSS, DAMAGES, COST OR
                EXPENSE WHICH MAY ARISE FROM ANY FAILURE OF PERFORMANCE BY
                VENDOR, OPRA, OPRA’S PROCESSOR OR ANY OPRA PARTICIPANT, OR FROM
                ANY DELAYS, INACCURACIES, ERRORS IN OR OMISSIONS OF, ANY OF THE
                OPRA DATA OR IN THE TRANSMISSION OR DELIVERY THEREOF, WHETHER OR
                NOT DUE TO ANY NEGLIGENT ACT OR OMISSION ON THE PART OF VENDOR,
                OPRA, OPRA’S PROCESSOR OR ANY OPRA PARTICIPANT. IN NO EVENT
                SHALL VENDOR, OPRA, OPRA’S PROCESSOR OR ANY PARTICIPANT BE
                LIABLE FOR ANY INCIDENTAL, SPECIAL, INDIRECT OR CONSEQUENTIAL
                DAMAGES, INCLUDING BUT NOT LIMITED TO LOST PROFITS, TRADING
                LOSSES, OR DAMAGES RESULTING FROM INCONVENIENCE OR LOSS OF USE
                OF THE SERVICE.
              </li>
              <li>
                The terms of this Agreement may be modified at any time upon
                notice to you. If you do not assent to this Agreement as
                modified at or prior to the time you next attempt to access the
                Service, this Agreement shall automatically be terminated. This
                Agreement as modified shall apply to your use of the Service
                from and after the date of the modification.
              </li>
              <li>
                Your receipt of the OPRA Data hereunder may be terminated at any
                time by you or by Vendor upon 30 days notice from the
                terminating party to the other party, and may be terminated
                immediately upon a determination by Vendor or OPRA that you are
                not in compliance with this Agreement.
              </li>
              <li>
                Nothing herein shall be deemed to prevent or restrict OPRA,
                OPRA’s Processor or any OPRA Participant from discontinuing to
                furnish OPRA Data for dissemination or from making such changes
                in the speed of transmission, the characteristics of the
                electrical signals representing the OPRA Data or the manner of
                disseminating the same, as OPRA shall from time to time
                determine to be appropriate, with or without notice to you. You
                shall not hold OPRA, OPRA’s Processor, or any OPRA Participant
                liable for any resulting liability, loss or damage that may
                arise therefrom.
              </li>
              <li>
                You agree to notify Vendor promptly of any changes in the
                information provided herein and to furnish Vendor any additional
                information requested by it in connection with your receipt of
                the OPRA Data.
              </li>
              <li>
                The parties acknowledge and agree that this Agreement is for the
                express benefit of OPRA, OPRA’s Processor and each OPRA
                Participant.
              </li>
              <li>
                The provisions of Sections 3, 4 and 9 will survive any
                termination of this Agreement and will remain in full force and
                effect.
              </li>
              <li>
                All notices under this Agreement may be provided either in
                writing or electronically. All written notices to Vendor shall
                be sent to the Vendor’s street address set forth above and all
                such notices to you shall be sent to the street address that you
                provide in paragraph 1. All electronic notices to Vendor shall
                be sent to Vendor’s email address set forth above and all such
                notices to you shall be provided to you where you access the
                OPRA Data electronically.
              </li>
            </ol>
            <p>
              IF YOU AGREE TO THE TERMS AND CONDITIONS SET FORTH ABOVE, PLEASE
              TYPE IN YOUR NAME AND ADDRESS IN THE SPACES PROVIDED ABOVE AND
              CLICK ON THE “I AGREE” BUTTON BELOW. By clicking on the “I AGREE”
              button below and typing in your name as indicated above, you agree
              that:
            </p>
            <ul>
              <li>
                you have read and you understand all of the terms and conditions
                set forth above; and
              </li>
              <li>
                you intend to form a legally binding and valid contract under
                which you will be bound by all of the terms and conditions set
                forth above.
              </li>
            </ul>
            <br />
            <h2>ADDENDUM FOR NONPROFESSIONALS</h2>
            <p>(To be completed by Nonprofessional Subscribers only)</p>
            <p>
              The purpose of this Addendum is to determine whether you are a
              “Nonprofessional” for OPRA’s purposes. OPRA defines a
              “Nonprofessional” as a legal person for whom the statements set
              out in Section 1 of this Addendum are true.
            </p>
            <p>
              1. You represent and agree that the following statements are and
              will continue to be true for so long as you receive OPRA Data as a
              Nonprofessional:
            </p>
            <p>
              a) You are either a “natural person” (an individual human being)
              or a “qualifying trust.”* You are not a corporation, partnership,
              limited liability company, or other form of entity (including any
              form of trust that does not qualify as a qualifying trust). If you
              agree, click on “I AGREE”:
            </p>
            <p>
              b) If you are a natural person, you shall use the OPRA Data solely
              in connection with your personal investment activities and the
              personal investment activities of your immediate family members**
              and qualifying trusts of which you are the trustee or custodian.
              If you are a qualifying trust, you shall use the OPRA Data solely
              in connection with your personal investment activities. In any
              case, you shall not use the OPRA Data in connection with any
              trade, business, professional or other commercial activities. If
              you agree, click on “I AGREE”:
            </p>
            <p>
              c) You are not a “Professional.” For a natural person who works in
              the United States, a “Professional” is a natural person who is:
              (i) registered or qualified with the Securities and Exchange
              Commission, the Commodities Futures Trading Commission, any state
              securities agency, any securities exchange/association, or any
              commodities/futures contract market/association, (ii) engaged as
              an “investment adviser,” as that term is defined in the Investment
              Advisers Act of 1940 (whether or not registered or qualified under
              that Act); or (iii) employed by a bank or other organization
              exempt from registration under Federal and/or state securities
              laws to perform functions that would require you to be so
              registered or qualified if you were to perform such functions for
              an organization not so exempt. For a natural person who works
              outside of the United States, a “Professional” is a natural person
              who performs the same functions as someone who would be considered
              a “Professional” in the United States. If you agree that you are
              not a “Professional”, click on “I AGREE”:
            </p>
            <p>
              2. You agree to notify Vendor promptly if your circumstances
              change such that any of the statements in Section 1 of this
              Addendum would no longer be true for you.
            </p>
            <p className={"smaller"}>
              *The term “qualifying trust” means (a) any irrevocable or
              revocable trust (1) which has only one trustee, who is a natural
              person and is not receiving any compensation for acting as trustee
              and (2) of which the only current beneficiaries are any one or
              more of the trustee and the immediate family members of the
              trustee, and (b) any custodial account established under a Uniform
              Transfers to Minors Act or similar state statute (1) which has
              only one custodian, who is a natural person and is not receiving
              any compensation for acting as custodian, and (2) of which the
              beneficiary is a lineal descendant (a child, grandchild, etc.) of
              the custodian. A “current beneficiary” is a beneficiary to whom
              the current income or principal of the trust may or must then be
              distributed, ignoring the possible exercise of any then
              unexercised power of appointment. The term “immediate family
              members” is defined in the footnote to paragraph 1(b) of this
              Addendum.
            </p>
            <p className={"smaller"}>
              **The term “immediate family members” means, with reference to a
              particular natural person, the spouse of that person, that
              person’s lineal ancestors (that is, parents, grandparents, etc.)
              and lineal descendants (that is, children, grandchildren, etc.),
              and the spouses (including surviving spouses) of that person’s
              lineal ancestors and lineal descendants. The term includes step
              and adoptive relationships.
            </p>
          </div>
        </div>
      </div>
      <div className="action-btns">
        <button
          type="button"
          className="btn grey small"
          onClick={() => {
            if (_content?.current) {
              if (_content.current.parentNode) {
                _content.current.parentNode.scrollTop =
                  _content.current.offsetHeight;
              }
            }
          }}
        >
          Scroll Down &#8595;
        </button>
      </div>
      <div className="btns">
        <button
          type="button"
          className="btn green"
          onClick={() => {
            ref.current.hide();

            if (clickAgree) {
              clickAgree();
            }
          }}
        >
          Agree
        </button>
        <button
          type="button"
          className="btn grey"
          onClick={() => {
            ref.current.hide();
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
});

export default Component;
