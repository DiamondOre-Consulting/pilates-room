import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const InStudioTerms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-dark py-16">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 ">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            Terms & Conditions
          </h1>
          <h2 className="text-xl text-white font-medium">
            (In-Studio Sessions)
          </h2>
        </div>

        <div className=" shadow-sm rounded-lg p-6 md:p-8">
          {/* 1. Booking */}
          <section className="mb-10">
            <h3 className="text-xl text-white font-semibold text-gray-100 mb-4 border-b pb-2">
              1. Booking Your Session
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-100">
              <li>The Pilates Room uses an online booking platform.</li>
              <li>
                Once you purchase a membership plan, our Customer Service team
                will share the access link.
              </li>
            </ul>
          </section>

          {/* 2. Cancellations */}
          <section className="mb-10">
            <h3 className="text-xl text-white  font-semibold text-gray-100 mb-4 border-b pb-2">
              2. Cancellations
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-100 mb-2">
                  Cancellation Windows:
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-100">
                  <li>
                    Online Sessions: Free cancellation up to 1 hour before the
                    session.
                  </li>
                  <li>
                    In-Studio Mat & Barre Groups: Free cancellation up to 6
                    hours before the session.
                  </li>
                  <li>
                    In-Studio Reformer, Privates & Semi-Privates: Free
                    cancellation up to 12 hours before the session.
                  </li>
                  <li>
                    Morning Sessions: Must be cancelled before 8:00 PM on the
                    previous day.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-100 mb-2">
                  Late Cancellations & No-Shows:
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-100">
                  <li>
                    If you do not cancel in time, one session will be deducted
                    from your pass.
                  </li>
                  <li>
                    For Unlimited Plan members, 1 day will be deducted from the
                    pass validity.
                  </li>
                  <li>
                    For Semi-Privates, if only one member attends, Private
                    session charges will apply.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Membership Validity */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-100 mb-4 border-b pb-2">
              3. Membership Validity
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-100">
              <li>
                All plans (except Quarter Plans) have a 4-week validity (28
                days) from the date of the first session.
              </li>
              <li>
                Quarter Plans have a 13-week validity (91 days) from the date of
                the first session.
              </li>
              <li>
                If unused, passes automatically expire after:
                <ul className="list-circle pl-5 mt-2 space-y-1">
                  <li>6 weeks (for 4-week pass)</li>
                  <li>15 weeks (for Quarter pass)</li>
                </ul>
              </li>
            </ul>
          </section>

          {/* Continue with other sections following the same pattern */}
          {/* 4. Studio Access */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-100 mb-4 border-b pb-2">
              4. Studio Access
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-100">
              <li>
                Passes are valid only for the studio location where you are
                enrolled (currently: Faridabad & Gurgaon + TPR Online).
              </li>
              <li>
                Unlimited Access Plans include only Mat Pilates & Barre sessions
                at that studio.
              </li>
              <li>
                They do not include Reformer, Privates, or sessions at other
                studio locations.
              </li>
            </ul>
          </section>

          {/* 5. Special Policies */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-100 mb-4 border-b pb-2">
              5. Special Policies
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-100">
              <li>
                In exceptional cases (e.g., medical emergencies), you may
                request a "Freeze Plan" to extend part of your pass validity.
                Contact Customer Service for details.
              </li>
              <li>
                If a class has fewer than 2 reservations, The Pilates Room may
                cancel it. Members will be notified via WhatsApp.
              </li>
              <li>
                Occasionally, sessions may be cancelled due to unforeseen
                reasons or public holidays. No make-up sessions are provided.
              </li>
              <li>
                Discovery Sessions are paid trial options (not free). Payments
                are valid for 15 days. Cancellation policies (see Section 2)
                apply.
              </li>
              <li>
                A valid pass is required to attend sessions. Entry may be denied
                if your pass has expired or has no sessions left.
              </li>
            </ul>
          </section>

          {/* 6. Media & Recordings */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-100 mb-4 border-b pb-2">
              6. Media & Recordings
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-100">
              <li>
                Online group sessions may be recorded for internal instructor
                training and quality purposes.
              </li>
              <li>
                The Pilates Room may use photos/videos from sessions on social
                media and other platforms.
              </li>
              <li>If you wish to opt out, please email [your studio email].</li>
              <li>
                We will do our best to exclude you from content. If
                inadvertently published, we will make efforts to remove it where
                possible, but hold no further liability.
              </li>
            </ul>
          </section>

          {/* 7. Studio Etiquette */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-100 mb-4 border-b pb-2">
              7. Studio Etiquette
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-100">
              <li>The Pilates Room studios have limited walk-in hours.</li>
              <li>
                To avoid disrupting classes, please avoid dropping in
                unannounced. For studio visits, contact Customer Service and we
                will arrange a suitable time.
              </li>
            </ul>
          </section>

          {/* 8. Pricing & Eligibility */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-100 mb-4 border-b pb-2">
              8. Pricing & Eligibility
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-100">
              <li>
                All plan prices are usually inclusive of taxes (18% GST) unless
                specifically mentioned otherwise.
              </li>
              <li>The Pilates Room sessions are for women aged 18+ only.</li>
              <li>
                Rights of admission and membership are reserved and at the sole
                discretion of The Pilates Room.
              </li>
              <li>
                Membership may be denied or revoked if a conflict of interest is
                identified.
              </li>
              <li>
                In such cases, a pro-rata refund of the unused portion of the
                membership will be processed (calculated based on sessions/days
                remaining).
              </li>
            </ul>
          </section>

          {/* 9. Membership Cancellation & Refunds */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-100 mb-4 border-b pb-2">
              9. Membership Cancellation & Refunds
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-100">
              <li>All membership passes are non-refundable once purchased.</li>
              <li>
                In exceptional cases where cancellation is approved:
                <ul className="list-circle pl-5 mt-2 space-y-1">
                  <li>
                    Any sessions already attended will be charged at the
                    standard per-class rate applicable at that time.
                  </li>
                  <li>
                    The refund, if any, will be calculated after deducting these
                    charges from the original membership fee.
                  </li>
                </ul>
              </li>
            </ul>
          </section>

          {/* <div className="mt-12 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default InStudioTerms;
