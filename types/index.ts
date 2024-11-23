export type FieldType = {
  selctionType?: 'category' | 'location' | 'propertytype';
};

export type User = {
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  phone: string;
  profile_picture: string;
  role: string;
  company_name: string;
  company_address: string;
  license: string;
  identificationno: string;
  profiletype: string;
};

export interface SelectedLocation {
  Id: number | string;
  Name: string;
  Value: string;
  id: number | string;
  label: string;
  value: string;
}

export interface ModalPickerSelctionTypes {
  Id: number | string;
  Name: string;
  Value: string;
  id: number | string;
  label: string;
  value: string;
}

export type Property = {
  _id: string;
  plot_number: string;
  property_location: string;
  property_size: string;
  property_image: string;
  property_type: string;
  property_owner: string;
  category: string;
  createdAt: Date;
  price: string;
  author_info: {
    name: string;
    profile_picture: string;
  };
  property_author: {
    _id: string;
    first_name: string;
    last_name: string;
    role: string;
    profile_picture: string;
  };
  listedBy: {
    _id: string;
    name: string;
    role: string;
    profile_picture: string;
  };
  agent: string;
};
