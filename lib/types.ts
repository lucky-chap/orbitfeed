import { Id } from "@/convex/_generated/dataModel";

export interface IUser {
  _id: Id<"users">;
  _creationTime: number;
  name?: string | undefined;
  image?: string | undefined;
  email?: string | undefined;
  emailVerificationTime?: number | undefined;
  phone?: string | undefined;
  phoneVerificationTime?: number | undefined;
  isAnonymous?: boolean | undefined;
}

export interface IOrbit {
  _id: Id<"orbits">;
  _creationTime: number;
  teamId?: Id<"teams"> | undefined;
  name: string;
  userId: Id<"users">;
  userEmail: string;
  website: string;
  status: string;
}

export interface IFeedback {
  _id: Id<"feedback">;
  _creationTime: number;
  image_storage_id?: Id<"_storage"> | undefined;
  type: string;
  by: string;
  status: string;
  orbitId: Id<"orbits">;
  content: string;
  location: string;
  country_code: string;
  route: string;
  image: string;
}

export interface ITeam {
  _id: Id<"teams">;
  _creationTime: number;
  name: string;
  leader: Id<"users">;
}

export interface IMember {
  _id: Id<"members">;
  _creationTime: number;
  teamId: Id<"teams">;
  memberId: Id<"users">;
  memberName: string;
  memberEmail: string;
  memberImage: string;
  role: string;
}

export interface IParticipant extends IUser {
  role: string;
}
