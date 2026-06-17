const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4";

export function BackgroundVideo() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          src={VIDEO_SRC}
        />
        {/* lavender tint + darken for legibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-purple-900/30 to-purple-800/40" />
        <div className="absolute inset-0 bg-[#0c0c0c]/35" />
      </div>

      {/* container-edge guide lines at the 36rem boundary */}
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[5]" />
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[5]" />
    </>
  );
}
