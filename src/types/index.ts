export type Role = "donor" | "receiver" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
};

export type DonationStatus = "available" | "accepted" | "in_transit" | "delivered";

export type Donation = {
  id: string;
  donorId: string;
  donorName: string;
  foodName: string;
  quantity: string;
  expiryTime: string;
  pickupAddress: string;
  imageName?: string;
  imageDataUrl?: string;
  status: DonationStatus;
  acceptedBy?: string;
  createdAt: string;
};

export type DonationInput = Omit<
  Donation,
  "id" | "donorId" | "donorName" | "status" | "acceptedBy" | "createdAt"
>;
