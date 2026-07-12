"use client";

import { useState, useEffect } from "react";
import {
  getStatistics,
  getActivities,
  getCampTimeline,
  getAdoptedVillages,
  getLeadership,
  getPastEvents,
  getUpcomingObservances,
  getDownloads,
  getCertificates,
  getNews,
  getJoinRequests,
  setPastEvents,
  setNews,
  setLeadership,
  setCertificates,
  addJoinRequest as storageAddJoinRequest,
  updateJoinRequestStatus as storageUpdateJoinRequestStatus,
  initializeStorage,
  getCommitteeMembers,
  setCommitteeMembers
} from "@/lib/data/storage";
import {
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
} from "@/lib/data/db";

export default function useNssData() {
  const [loading, setLoading] = useState(true);
  const [statistics, setStatsState] = useState<Statistic[]>([]);
  const [activities, setActivitiesState] = useState<Activity[]>([]);
  const [campTimeline, setCampTimelineState] = useState<CampTimelineItem[]>([]);
  const [adoptedVillages, setAdoptedVillagesState] = useState<AdoptedVillage[]>([]);
  const [leadership, setLeadershipState] = useState<FacultyLeader[]>([]);
  const [pastEvents, setPastEventsState] = useState<PastEvent[]>([]);
  const [upcomingObservances, setUpcomingObservancesState] = useState<UpcomingObservance[]>([]);
  const [downloads, setDownloadsState] = useState<DownloadItem[]>([]);
  const [certificates, setCertificatesState] = useState<Certificate[]>([]);
  const [news, setNewsState] = useState<NewsItem[]>([]);
  const [joinRequests, setJoinRequestsState] = useState<JoinRequest[]>([]);
  const [committeeMembers, setCommitteeMembersState] = useState<CommitteeMember[]>([]);

  const refreshData = () => {
    initializeStorage();
    setStatsState(getStatistics());
    setActivitiesState(getActivities());
    setCampTimelineState(getCampTimeline());
    setAdoptedVillagesState(getAdoptedVillages());
    setLeadershipState(getLeadership());
    setPastEventsState(getPastEvents());
    setUpcomingObservancesState(getUpcomingObservances());
    setDownloadsState(getDownloads());
    setCertificatesState(getCertificates());
    setNewsState(getNews());
    setJoinRequestsState(getJoinRequests());
    setCommitteeMembersState(getCommitteeMembers());
  };

  useEffect(() => {
    refreshData();
    setLoading(false);

    const handleStorageChange = () => {
      refreshData();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Update methods
  const updatePastEvents = (newEvents: PastEvent[]) => {
    setPastEvents(newEvents);
    setPastEventsState(newEvents);
  };

  const updateNews = (newNews: NewsItem[]) => {
    setNews(newNews);
    setNewsState(newNews);
  };

  const updateLeadership = (newLeaders: FacultyLeader[]) => {
    setLeadership(newLeaders);
    setLeadershipState(newLeaders);
  };

  const updateCertificates = (newCerts: Certificate[]) => {
    setCertificates(newCerts);
    setCertificatesState(newCerts);
  };

  const submitJoinRequest = (req: JoinRequest) => {
    storageAddJoinRequest(req);
    refreshData();
  };

  const approveOrRejectRequest = (id: string, status: "Approved" | "Rejected") => {
    storageUpdateJoinRequestStatus(id, status);
    refreshData();
  };

  const updateCommitteeMembers = (newMembers: CommitteeMember[]) => {
    setCommitteeMembers(newMembers);
    setCommitteeMembersState(newMembers);
  };

  return {
    loading,
    statistics,
    activities,
    campTimeline,
    adoptedVillages,
    leadership,
    pastEvents,
    upcomingObservances,
    downloads,
    certificates,
    news,
    joinRequests,
    committeeMembers,
    refreshData,
    updatePastEvents,
    updateNews,
    updateLeadership,
    updateCertificates,
    updateCommitteeMembers,
    submitJoinRequest,
    approveOrRejectRequest
  };
}
