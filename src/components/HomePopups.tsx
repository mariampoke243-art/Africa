import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function HomePopups() {
  const [showMember, setShowMember] = useState(true);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowMember(true);
      setShowAnnouncement(true);
    }, 800);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* =====================================================
          POPUP 1 — BECOME A MEMBER
          ===================================================== */}
      {showMember && (
        <div
          className="
            fixed
            left-0
            top-1/2
            -translate-y-1/2
            z-[9999]
            w-[280px]
            sm:w-[330px]
            bg-white
            rounded-r-2xl
            overflow-hidden
            shadow-2xl
            border
            border-gray-200
          "
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setShowMember(false)}
            aria-label="Close Become a Member popup"
            className="
              absolute
              right-3
              top-3
              z-20
              w-9
              h-9
              rounded-full
              bg-black/60
              text-white
              flex
              items-center
              justify-center
              hover:bg-black/80
              transition
            "
          >
            <i className="ri-close-line text-xl"></i>
          </button>

          {/* Image */}
          <img
            src="/images/become-member.png"
            alt="Become a Member - Africa Economic Forum"
            className="w-full h-44 object-cover"
          />

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>

              <span className="text-teal-600 text-xs font-bold uppercase tracking-wider">
                Africa Economic Forum
              </span>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Become a Member
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              Join the Africa Economic Forum community and connect with
              leaders, investors, institutions and changemakers shaping
              Africa's future.
            </p>

            <Link
              to="/join"
              onClick={() => setShowMember(false)}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-2
                bg-blue-900
                text-white
                py-3
                px-4
                rounded-lg
                font-semibold
                hover:bg-blue-800
                transition
              "
            >
              <span>Become a Member</span>
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      )}

      {/* =====================================================
          POPUP 2 — AEF 2026 ANNOUNCEMENT
          ===================================================== */}
      {showAnnouncement && (
        <div
          className="
            fixed
            right-0
            top-1/2
            -translate-y-1/2
            z-[9999]
            w-[280px]
            sm:w-[330px]
            bg-white
            rounded-l-2xl
            overflow-hidden
            shadow-2xl
            border
            border-gray-200
          "
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setShowAnnouncement(false)}
            aria-label="Close announcement popup"
            className="
              absolute
              right-3
              top-3
              z-20
              w-9
              h-9
              rounded-full
              bg-black/60
              text-white
              flex
              items-center
              justify-center
              hover:bg-black/80
              transition
            "
          >
            <i className="ri-close-line text-xl"></i>
          </button>

          {/* =================================================
              ANNOUNCEMENT IMAGE
              ================================================= */}
          <div className="relative h-44">
            <img
              src="/images/aef-2026-announcement.jpg"
              alt="Africa Economic Forum 2026 - 10–11 November 2026 - Kinshasa"
              className="w-full h-full object-cover"
            />

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-900/20 to-transparent"></div>

            <div className="absolute bottom-4 left-5 right-5">
              <p className="text-white text-xs font-bold uppercase tracking-[0.2em]">
                New Announcement
              </p>

              <p className="text-white text-2xl font-bold mt-1">
                AEF 2026
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>

              <span className="text-red-600 text-xs font-bold uppercase tracking-wider">
                New Announcement
              </span>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Africa Economic Forum 2026
            </h2>

            <p className="text-blue-900 font-bold text-sm mb-2">
              10–11 November 2026
            </p>

            <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
              <i className="ri-map-pin-line text-teal-600"></i>

              <span>
                Kinshasa, Democratic Republic of Congo
              </span>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              Join us in Kinshasa for the Africa Economic Forum 2026 and
              discover the leaders, ideas and partnerships shaping Africa's
              role in the new global order.
            </p>

            <Link
              to="/meetings"
              onClick={() => setShowAnnouncement(false)}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-2
                bg-blue-900
                text-white
                py-3
                px-4
                rounded-lg
                font-semibold
                hover:bg-blue-800
                transition
              "
            >
              <span>Discover the Event</span>
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
