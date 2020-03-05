import { TGroupItem } from 'types'

export type TPositionItem = {
  rate: string;
  name: string;
  id: number;
}
export type TRoleItem = {
  groups: TGroupItem[];
  name: string;
  id: number;
}

export type TStaffItem = {
  id: number;
  photo: string;
  username: string;
  fullName: string;
  position: TPositionItem;
  rate: string;
}

export type TPermissionItem = {
  id: number;
  name: string;
  codename: string;
}

export type TUserInfo = {
  user: {
    username: string;
    id: number;
  };
  isSuperuser: boolean;
  position: TPositionItem;
  role: TRoleItem;
}
