// Centralized image URLs from Unsplash
// All images are free for commercial use (Unsplash License)

const unsplash = (id: string, w = 1280) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Hero carousel slides
export const HERO_IMAGES = {
  globalLogistics: unsplash("photo-1578575437130-527eed3abbec", 1920),
  deliveryTruck: unsplash("photo-1601584115197-04ecc0da31d7", 1920),
  shippingContainers: unsplash("photo-1605745341112-85968b19335b", 1920),
};

// Page banners (dark/dramatic)
export const BANNER_IMAGES = {
  default: unsplash("photo-1586528116311-ad8dd3c8310d", 1920),
  warehouse: unsplash("photo-1553413077-190dd305871c", 1920),
  containers: unsplash("photo-1571902943202-507ec2618e8f", 1920),
  truck: unsplash("photo-1580674285054-bed31e145f59", 1920),
};

// About page
export const ABOUT_IMAGES = {
  ourStory: unsplash("photo-1553413077-190dd305871c"),
  team: {
    jamesMitchell: unsplash("photo-1560250097-0b93528c311a", 400),
    sarahOkonkwo: unsplash("photo-1580489944761-15a19d654956", 400),
    davidChen: unsplash("photo-1556157382-97eda2d62296", 400),
    mariaRodriguez: unsplash("photo-1573496359142-b8d87734a5a2", 400),
  },
};

// Service overview cards
export const SERVICE_CARD_IMAGES = {
  internationalFreight: unsplash("photo-1578575437130-527eed3abbec"),
  domesticFreight: unsplash("photo-1601584115197-04ecc0da31d7"),
  freightForwarding: unsplash("photo-1565891741441-64926e441838"),
  consultation: unsplash("photo-1556761175-5973dc0f32e7"),
};

// Freight service cards
export const FREIGHT_CARD_IMAGES = {
  airFreight: unsplash("photo-1474302770737-173ee21bab63"),
  oceanFreight: unsplash("photo-1578575437130-527eed3abbec"),
  roadFreight: unsplash("photo-1544620347-c4fd4a3d5957"),
  socMovements: unsplash("photo-1494412651409-8963ce7935a7"),
};

// Customs service cards
export const CUSTOMS_CARD_IMAGES = {
  exportImport: unsplash("photo-1524995997946-a1c2e315a42f"),
  importersRep: unsplash("photo-1554224155-6726b3ff858f"),
};

// Movers service cards
export const MOVERS_CARD_IMAGES = {
  householdGoods: unsplash("photo-1600585152220-90363fe7e115"),
  commercialGoods: unsplash("photo-1497366216548-37526070297c"),
};

// Service detail page images
export const SERVICE_DETAIL_IMAGES = {
  internationalFreight: unsplash("photo-1586528116311-ad8dd3c8310d"),
  domesticFreight: unsplash("photo-1580674285054-bed31e145f59"),
  freightForwarding: unsplash("photo-1566576912321-d58ddd7a6088"),
  consultation: unsplash("photo-1521737604893-d14cc237f11d"),
  airFreight: unsplash("photo-1559060017-445fb9722f2a"),
  oceanFreight: unsplash("photo-1578575437130-527eed3abbec"),
  roadFreight: unsplash("photo-1544620347-c4fd4a3d5957"),
  socMovements: unsplash("photo-1571902943202-507ec2618e8f"),
  householdGoods: unsplash("photo-1600585152220-90363fe7e115"),
  commercialGoods: unsplash("photo-1497366754035-f200968a6e72"),
  exportImport: unsplash("photo-1587293852726-70cdb56c2866"),
  importersRep: unsplash("photo-1554224155-6726b3ff858f"),
};
