// Storage wrapper for JIT NSS Unit dynamic CMS
import {
  OFFICIAL_STATISTICS,
  OFFICIAL_ACTIVITIES,
  CAMP_TIMELINE_ITEMS,
  ADOPTED_VILLAGES,
  LEADERSHIP_PROFILES,
  VERIFIED_PAST_EVENTS,
  UPCOMING_OBSERVANCES,
  OFFICIAL_DOWNLOADS,
  VERIFIED_CERTIFICATES,
  OFFICIAL_NEWS,
  DEFAULT_COMMITTEE_MEMBERS,
  Statistic,
  Activity,
  CampTimelineItem,
  AdoptedVillage,
  DownloadItem,
  FacultyLeader,
  PastEvent,
  UpcomingObservance,
  Certificate,
  JoinRequest,
  NewsItem,
  CommitteeMember
} from "./db";

const isClient = () => typeof window !== "undefined";

const KEYS = {
  STATISTICS: "jit_nss_statistics",
  ACTIVITIES: "jit_nss_activities",
  CAMP_TIMELINE: "jit_nss_camp_timeline",
  ADOPTED_VILLAGES: "jit_nss_adopted_villages",
  LEADERSHIP: "jit_nss_leadership_v3",
  PAST_EVENTS: "jit_nss_past_events_v3",
  UPCOMING_OBSERVANCES: "jit_nss_upcoming_observances",
  DOWNLOADS: "jit_nss_downloads",
  CERTIFICATES: "jit_nss_certificates",
  NEWS: "jit_nss_news",
  JOIN_REQUESTS: "jit_nss_join_requests",
  COMMITTEE: "jit_nss_committee_v3"
};

export function initializeStorage() {
  if (!isClient()) return;

  if (!localStorage.getItem(KEYS.STATISTICS)) {
    localStorage.setItem(KEYS.STATISTICS, JSON.stringify(OFFICIAL_STATISTICS));
  }
  if (!localStorage.getItem(KEYS.ACTIVITIES)) {
    localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(OFFICIAL_ACTIVITIES));
  }
  if (!localStorage.getItem(KEYS.CAMP_TIMELINE)) {
    localStorage.setItem(KEYS.CAMP_TIMELINE, JSON.stringify(CAMP_TIMELINE_ITEMS));
  }
  if (!localStorage.getItem(KEYS.ADOPTED_VILLAGES)) {
    localStorage.setItem(KEYS.ADOPTED_VILLAGES, JSON.stringify(ADOPTED_VILLAGES));
  }
  if (!localStorage.getItem(KEYS.LEADERSHIP)) {
    localStorage.setItem(KEYS.LEADERSHIP, JSON.stringify(LEADERSHIP_PROFILES));
  }
  if (!localStorage.getItem(KEYS.PAST_EVENTS)) {
    localStorage.setItem(KEYS.PAST_EVENTS, JSON.stringify(VERIFIED_PAST_EVENTS));
  }
  if (!localStorage.getItem(KEYS.UPCOMING_OBSERVANCES)) {
    localStorage.setItem(KEYS.UPCOMING_OBSERVANCES, JSON.stringify(UPCOMING_OBSERVANCES));
  }
  if (!localStorage.getItem(KEYS.DOWNLOADS)) {
    localStorage.setItem(KEYS.DOWNLOADS, JSON.stringify(OFFICIAL_DOWNLOADS));
  }
  if (!localStorage.getItem(KEYS.CERTIFICATES)) {
    localStorage.setItem(KEYS.CERTIFICATES, JSON.stringify(VERIFIED_CERTIFICATES));
  }
  if (!localStorage.getItem(KEYS.NEWS)) {
    localStorage.setItem(KEYS.NEWS, JSON.stringify(OFFICIAL_NEWS));
  }
  if (!localStorage.getItem(KEYS.JOIN_REQUESTS)) {
    localStorage.setItem(KEYS.JOIN_REQUESTS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.COMMITTEE)) {
    localStorage.setItem(KEYS.COMMITTEE, JSON.stringify(DEFAULT_COMMITTEE_MEMBERS));
  }
}

function getList<T>(key: string, defaultData: T[]): T[] {
  if (!isClient()) return defaultData;
  initializeStorage();
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultData;
}

function setList<T>(key: string, data: T[]): void {
  if (!isClient()) return;
  localStorage.setItem(key, JSON.stringify(data));
}

// Export getters & setters
export const getStatistics = () => getList<Statistic>(KEYS.STATISTICS, OFFICIAL_STATISTICS);
export const setStatistics = (data: Statistic[]) => setList(KEYS.STATISTICS, data);

export const getActivities = () => getList<Activity>(KEYS.ACTIVITIES, OFFICIAL_ACTIVITIES);
export const setActivities = (data: Activity[]) => setList(KEYS.ACTIVITIES, data);

export const getCampTimeline = () => getList<CampTimelineItem>(KEYS.CAMP_TIMELINE, CAMP_TIMELINE_ITEMS);
export const setCampTimeline = (data: CampTimelineItem[]) => setList(KEYS.CAMP_TIMELINE, data);

export const getAdoptedVillages = () => getList<AdoptedVillage>(KEYS.ADOPTED_VILLAGES, ADOPTED_VILLAGES);
export const setAdoptedVillages = (data: AdoptedVillage[]) => setList(KEYS.ADOPTED_VILLAGES, data);

export const getLeadership = () => getList<FacultyLeader>(KEYS.LEADERSHIP, LEADERSHIP_PROFILES);
export const setLeadership = (data: FacultyLeader[]) => setList(KEYS.LEADERSHIP, data);

export const getPastEvents = () => getList<PastEvent>(KEYS.PAST_EVENTS, VERIFIED_PAST_EVENTS);
export const setPastEvents = (data: PastEvent[]) => setList(KEYS.PAST_EVENTS, data);

export const getUpcomingObservances = () => getList<UpcomingObservance>(KEYS.UPCOMING_OBSERVANCES, UPCOMING_OBSERVANCES);
export const setUpcomingObservances = (data: UpcomingObservance[]) => setList(KEYS.UPCOMING_OBSERVANCES, data);

export const getDownloads = () => getList<DownloadItem>(KEYS.DOWNLOADS, OFFICIAL_DOWNLOADS);
export const setDownloads = (data: DownloadItem[]) => setList(KEYS.DOWNLOADS, data);

export const getCertificates = () => getList<Certificate>(KEYS.CERTIFICATES, VERIFIED_CERTIFICATES);
export const setCertificates = (data: Certificate[]) => setList(KEYS.CERTIFICATES, data);

export const getNews = () => getList<NewsItem>(KEYS.NEWS, OFFICIAL_NEWS);
export const setNews = (data: NewsItem[]) => setList(KEYS.NEWS, data);

export const getJoinRequests = () => getList<JoinRequest>(KEYS.JOIN_REQUESTS, []);
export const setJoinRequests = (data: JoinRequest[]) => setList(KEYS.JOIN_REQUESTS, data);

export const addJoinRequest = (req: JoinRequest) => {
  const current = getJoinRequests();
  setJoinRequests([req, ...current]);
};

export const updateJoinRequestStatus = (id: string, status: "Approved" | "Rejected") => {
  const current = getJoinRequests();
  const updated = current.map(item => {
    if (item.id === id) {
      return { ...item, status };
    }
    return item;
  });
  setJoinRequests(updated);
};

export const getCommitteeMembers = () => getList<CommitteeMember>(KEYS.COMMITTEE, DEFAULT_COMMITTEE_MEMBERS);
export const setCommitteeMembers = (data: CommitteeMember[]) => setList(KEYS.COMMITTEE, data);
