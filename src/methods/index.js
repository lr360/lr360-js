import trackAction from './track.action';
import setup from './setup';
import identifyMember from './identify.member';
import { baseRequest } from './base.request';

export const clientMethods = {
    setup: setup,
    trackAction: trackAction,
    baseRequest: baseRequest,
    identifyMember: identifyMember
};
