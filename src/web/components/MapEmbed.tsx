export function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full min-h-[320px] border border-granite/15 overflow-hidden ${className}`}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3815.746832057609!2d-88.97751509999999!3d16.9869989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5e6dcc86603e85%3A0x96be8a2d6e92deba!2sRio%20On%20Pools!5e0!3m2!1sen!2sbz!4v1783370578225!5m2!1sen!2sbz"
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: "320px" }}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        title="Rio On Pools location map"
      />
    </div>
  );
}
