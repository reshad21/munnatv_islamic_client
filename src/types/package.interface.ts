export interface PackageImage {
  id: string;
  image: string;
}

export interface PackageApi {
  id: string;
  title: string;
  travellPlace: string;
  country: string;
  maxTravelers: string;
  minPax: string;
  duration: string;
  description: string;
  createdAt: string;
  status: boolean;
  packageImages: PackageImage[];
}



export interface PackageFormData {
  title: string;
  country: string;
  maxTravelers: string;
  minPax: string;
  duration: string;
  description: string;
  status: boolean;
  images: File[];
  travellPlace: string;
}

export interface EditPackageFormProps {
  packageId: string;
}