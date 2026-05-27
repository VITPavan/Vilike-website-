/** Viewer-facing catalog copy — written for the site, not raw brochure paste */

export const brandStory = {
  headline: "Truly European-standard circular knitting technology",
  intro:
    "VILIKE FAB TECH represents Vilike circular knitting machines in Tirupur. Every machine is built around precision yarn control, German and Swedish core components, and export-grade stitch stability for high-volume mills.",
};

export const machineSystemOverview = {
  title: "How a VILIKE circular knitting machine is built",
  sections: [
    {
      heading: "Yarn feeding & tension control",
      body: "Dozens of yarn feeders and tensioners sit on the upper creel ring. Each position guides yarn smoothly into the knitting head while keeping tension consistent — critical for Lycra attachment and fine jersey counts.",
    },
    {
      heading: "Knitting head — cams, needles & cylinder",
      body: "The central cylinder carries the needle bed and cam track. German 7075-T6 cam boxes and Sweden-made cams work together for accurate stitch formation, even at high RPM. The alloy steel cylinder dissipates heat and stays dimensionally stable over long runs.",
    },
    {
      heading: "Frame, safety & drive",
      body: "A rigid steel frame supports the upper assembly. The lower base houses the servo motor, cam drive, and take-up rollers. Perforated safety doors protect operators while allowing quick access for maintenance.",
    },
    {
      heading: "Fabric take-down",
      body: "Finished fabric is drawn through take-up rollers and wound on the batching roll. Waste yarn is collected in a dedicated bin to keep the working area clean.",
    },
  ],
};

export const componentHotspots = [
  {
    id: "feeders",
    label: "Yarn Feeders",
    x: 50,
    y: 12,
    zoomImage: "/images/machine-gallery-6.png",
    description:
      "Individual feeder stations on the top creel deliver yarn to each needle path. Even feed rate reduces broken yarn and shade variation across the roll.",
  },
  {
    id: "tensioners",
    label: "Yarn Tensioners",
    x: 62,
    y: 18,
    zoomImage: "/images/machine-cutout-labeled.png",
    description:
      "Precision tensioners hold yarn at the correct elasticity — especially important when running Lycra and blended counts.",
  },
  {
    id: "frame",
    label: "Steel Frame",
    x: 22,
    y: 38,
    zoomImage: "/images/machine-gallery-4.png",
    description:
      "Heavy-duty frame in electric blue and white carries the knitting head with minimal vibration at production speed.",
  },
  {
    id: "guiders",
    label: "Yarn Guiders",
    x: 32,
    y: 48,
    zoomImage: "/images/machine-cutout-labeled.png",
    description:
      "Vertical guider columns align yarn from the creel into the cylinder without snagging or twist.",
  },
  {
    id: "cylinder",
    label: "Knitting Cylinder",
    x: 50,
    y: 42,
    zoomImage: "/images/machine-gallery-6.png",
    description:
      "High-density needle array with alloy steel cylinder for complicated designs and stable fabric hand-feel.",
  },
  {
    id: "cambox",
    label: "Servo Motor & Cam Box",
    x: 50,
    y: 72,
    zoomImage: "/images/machine-interior.png",
    description:
      "Servo-driven cam box with German aircraft-grade components controls stitch length and pattern timing. CE-certified electrical kit included.",
  },
  {
    id: "takeup",
    label: "Take-Up Rollers",
    x: 72,
    y: 68,
    zoomImage: "/images/machine-interior.png",
    description:
      "Multi-stage take-up pulls fabric at constant tension onto the winding roll for uniform batch weight.",
  },
  {
    id: "waste",
    label: "Waste Yarn Collection",
    x: 38,
    y: 78,
    zoomImage: "/images/machine-interior.png",
    description:
      "Integrated waste collection keeps lint and broken ends away from the knitting zone.",
  },
];

export function formatModelDescription(specs: {
  dia: number;
  gauge: string;
  feeders: number;
  note?: string;
  category: string;
  delivery_days: number;
}): string {
  const lycra = specs.note ? ` This configuration includes ${specs.note}.` : "";
  return (
    `A ${specs.dia}-inch diameter machine at ${specs.gauge} gauge with ${specs.feeders} feeders, ` +
    `configured as a ${specs.category} build. ` +
    `Typical delivery from Xiamen factory to your mill is approximately ${specs.delivery_days} days after order confirmation.` +
    lycra
  );
}

export const salesServiceCopy = {
  title: "Sales & after-sales support from Tirupur",
  points: [
    "Live machine viewing and trial knitting at our Avinashi Road office",
    "Installation, operator training, and commissioning support",
    "Genuine Vilike spares, AMC packages, and on-call service engineers",
    "Import documentation, LC guidance, and Chennai port coordination via MSN Logistics",
  ],
};
