import { defineRelations } from "drizzle-orm";
import * as schema from "./schemas";

export const relations = defineRelations(schema, (r) => ({
  user: {
    sessions: r.many.session({
      from: r.user.id,
      to: r.session.userId,
    }),
    accounts: r.many.account({
      from: r.user.id,
      to: r.account.userId,
    }),
    members: r.many.member({
      from: r.user.id,
      to: r.member.userId,
    }),
    invitations: r.many.invitation({
      from: r.user.id,
      to: r.invitation.inviterId,
    }),
  },
  session: {
    user: r.one.user({
      from: r.session.userId,
      to: r.user.id,
      optional: false,
    }),
  },
  account: {
    user: r.one.user({
      from: r.account.userId,
      to: r.user.id,
      optional: false,
    }),
  },
  workspace: {
    members: r.many.member({
      from: r.workspace.id,
      to: r.member.workspaceId,
    }),
    invitations: r.many.invitation({
      from: r.workspace.id,
      to: r.invitation.workspaceId,
    }),
  },
  member: {
    workspace: r.one.workspace({
      from: r.member.workspaceId,
      to: r.workspace.id,
      optional: false,
    }),
    user: r.one.user({
      from: r.member.userId,
      to: r.user.id,
      optional: false,
    }),
  },
  invitation: {
    workspace: r.one.workspace({
      from: r.invitation.workspaceId,
      to: r.workspace.id,
      optional: false,
    }),
    user: r.one.user({
      from: r.invitation.inviterId,
      to: r.user.id,
      optional: false,
    }),
  },
}));
