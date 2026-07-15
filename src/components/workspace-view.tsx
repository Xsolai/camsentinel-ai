"use client";

import {
  BellRinging,
  Camera,
  CheckCircle,
  Clock,
  DownloadSimple,
  Funnel,
  MapPin,
  Pulse,
  ShieldCheck,
  Warning,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { analytics, cameras, sites } from "@/lib/mock-data";
import { filterIncidents, isValidProfile } from "@/lib/demo-utils";
import type {
  IncidentSeverity,
  IncidentStatus,
  UserProfile,
} from "@/lib/types";
import { useMockStore } from "./mock-store";

function PageHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 20,
        alignItems: "flex-end",
        flexWrap: "wrap",
      }}
    >
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="app-title" style={{ marginTop: 7 }}>
          {title}
        </h1>
      </div>
      {children}
    </div>
  );
}
const severityClass = (severity: IncidentSeverity) =>
  severity === "critical"
    ? "danger"
    : severity === "warning"
      ? "warning"
      : "success";

function Overview() {
  const { incidents } = useMockStore();
  return (
    <>
      <PageHeading eyebrow="Wednesday, 15 July" title="North Distribution Hub">
        <div className="toolbar">
          <button className="btn btn-secondary">
            <Funnel size={17} /> Last 24 hours
          </button>
          <button className="btn btn-primary">
            <BellRinging size={17} /> Configure alerts
          </button>
        </div>
      </PageHeading>
      <div className="stats-grid">
        <div className="stat-card">
          <Camera size={20} />
          <span className="muted" style={{ marginLeft: 8 }}>
            Cameras online
          </span>
          <strong>24 / 24</strong>
        </div>
        <div className="stat-card">
          <Warning size={20} />
          <span className="muted" style={{ marginLeft: 8 }}>
            Open incidents
          </span>
          <strong>
            {incidents.filter((item) => item.status !== "resolved").length}
          </strong>
        </div>
        <div className="stat-card">
          <Clock size={20} />
          <span className="muted" style={{ marginLeft: 8 }}>
            Median response
          </span>
          <strong>5m 42s</strong>
        </div>
      </div>
      <div className="dashboard-grid">
        <div className="panel map-card">
          <Image
            src="/images/facility-intelligence-map.png"
            width={1536}
            height={1024}
            alt="Spatial AI monitoring map for North Distribution Hub"
            priority
          />
          <div className="map-overlay">
            <span>
              <strong>Live facility map</strong>
              <small
                className="muted"
                style={{ display: "block", marginTop: 4 }}
              >
                7 active zones · 98.4% health
              </small>
            </span>
            <span className="status success">Live</span>
          </div>
        </div>
        <aside className="panel">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <strong>Priority incidents</strong>
            <Link
              href="/app/incidents"
              className="muted"
              style={{ fontSize: 13 }}
            >
              View all
            </Link>
          </div>
          <div className="incident-list">
            {incidents.map((incident) => (
              <Link
                href="/app/incidents"
                className="incident-item"
                key={incident.id}
              >
                <Image
                  src={incident.image}
                  width={180}
                  height={112}
                  alt=""
                  loading="eager"
                />
                <span>
                  <span
                    className={`status ${severityClass(incident.severity)}`}
                  >
                    {incident.severity}
                  </span>
                  <h3>{incident.title}</h3>
                  <small className="muted">
                    {incident.zone} · {incident.time}
                  </small>
                </span>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}

function Incidents() {
  const { incidents, updateIncidentStatus } = useMockStore();
  const [filter, setFilter] = useState<"all" | IncidentSeverity>("all");
  const [selectedId, setSelectedId] = useState(incidents[0]?.id);
  const selected =
    incidents.find((item) => item.id === selectedId) ?? incidents[0];
  const visible = filterIncidents(incidents, filter);
  return (
    <>
      <PageHeading
        eyebrow="Incident workspace"
        title="Review and resolve what needs attention"
      >
        <div className="toolbar">
          <select
            className="field"
            aria-label="Filter incidents"
            value={filter}
            onChange={(event) => setFilter(event.target.value as typeof filter)}
            style={{ width: 160 }}
          >
            <option value="all">All severities</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="info">Information</option>
          </select>
          <button className="btn btn-secondary">
            <DownloadSimple size={17} /> Export
          </button>
        </div>
      </PageHeading>
      <div className="dashboard-grid">
        <div className="panel">
          <div className="incident-list">
            {visible.map((incident) => (
              <button
                key={incident.id}
                className={`incident-item ${selected?.id === incident.id ? "selected" : ""}`}
                onClick={() => setSelectedId(incident.id)}
              >
                <Image
                  src={incident.image}
                  width={180}
                  height={112}
                  alt=""
                  loading="eager"
                />
                <span>
                  <span
                    className={`status ${severityClass(incident.severity)}`}
                  >
                    {incident.severity}
                  </span>
                  <h3>{incident.title}</h3>
                  <small className="muted">
                    {incident.id} · {incident.time}
                  </small>
                </span>
              </button>
            ))}
          </div>
        </div>
        {selected && (
          <aside className="panel">
            <Image
              src={selected.image}
              width={720}
              height={440}
              alt={`Synthetic CCTV evidence for ${selected.title}`}
              priority
              style={{
                width: "100%",
                borderRadius: 14,
                aspectRatio: "16/10",
                objectFit: "cover",
              }}
            />
            <span
              className={`status ${severityClass(selected.severity)}`}
              style={{ marginTop: 18 }}
            >
              {selected.severity}
            </span>
            <h2 style={{ fontSize: 24, letterSpacing: "-.035em" }}>
              {selected.title}
            </h2>
            <p className="muted" style={{ lineHeight: 1.65 }}>
              {selected.description}
            </p>
            <div className="summary-line">
              <span>Camera</span>
              <strong>{selected.cameraId}</strong>
            </div>
            <div className="summary-line">
              <span>Zone</span>
              <strong>{selected.zone}</strong>
            </div>
            <div className="field-wrap" style={{ marginTop: 20 }}>
              <label htmlFor="status">Incident status</label>
              <select
                id="status"
                className="field"
                value={selected.status}
                onChange={(event) =>
                  updateIncidentStatus(
                    selected.id,
                    event.target.value as IncidentStatus,
                  )
                }
              >
                <option value="new">New</option>
                <option value="reviewing">Reviewing</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </aside>
        )}
      </div>
    </>
  );
}

function Analytics() {
  const maximum = Math.max(...analytics.map((item) => item.incidents));
  return (
    <>
      <PageHeading
        eyebrow="Operational analytics"
        title="Understand risk, response, and camera health"
      >
        <button className="btn btn-secondary">
          <DownloadSimple size={17} /> Download report
        </button>
      </PageHeading>
      <div className="stats-grid">
        <div className="stat-card">
          <Pulse size={20} />
          <span className="muted" style={{ marginLeft: 8 }}>
            Events reviewed
          </span>
          <strong>1,284</strong>
          <span className="status success">↑ 12% this month</span>
        </div>
        <div className="stat-card">
          <Clock size={20} />
          <span className="muted" style={{ marginLeft: 8 }}>
            Response time
          </span>
          <strong>5m 42s</strong>
          <span className="status success">↓ 18% faster</span>
        </div>
        <div className="stat-card">
          <ShieldCheck size={20} />
          <span className="muted" style={{ marginLeft: 8 }}>
            Resolved within SLA
          </span>
          <strong>94.8%</strong>
          <span className="status success">On target</span>
        </div>
      </div>
      <div className="dashboard-grid">
        <section className="panel">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>Incident volume</strong>
            <span className="muted mono" style={{ fontSize: 12 }}>
              LAST 7 DAYS
            </span>
          </div>
          <div className="chart" aria-label="Incident volume bar chart">
            {analytics.map((item) => (
              <div
                key={item.label}
                className="bar"
                title={`${item.label}: ${item.incidents} incidents`}
                style={{
                  height: `${Math.max(18, (item.incidents / maximum) * 100)}%`,
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: 10,
            }}
            className="muted mono"
          >
            {analytics.map((item) => (
              <small key={item.label}>{item.label}</small>
            ))}
          </div>
        </section>
        <section className="panel">
          <strong>Response by site</strong>
          <div className="metric-list">
            {sites.map((site, index) => (
              <div className="metric-row" key={site.id}>
                <span>
                  <strong style={{ fontSize: 14 }}>{site.name}</strong>
                  <small className="muted" style={{ display: "block" }}>
                    {site.cameraCount} cameras
                  </small>
                </span>
                <strong>{5 + index}m</strong>
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="panel" style={{ marginTop: 18 }}>
        <strong>Detection performance</strong>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Detection rule</th>
                <th>Events</th>
                <th>Reviewed</th>
                <th>False positive rate</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Restricted-zone entry</td>
                <td>184</td>
                <td>100%</td>
                <td>3.2%</td>
                <td className="status success">Improving</td>
              </tr>
              <tr>
                <td>Blocked loading bay</td>
                <td>96</td>
                <td>98%</td>
                <td>5.1%</td>
                <td className="status warning">Stable</td>
              </tr>
              <tr>
                <td>Forklift safety path</td>
                <td>64</td>
                <td>100%</td>
                <td>2.8%</td>
                <td className="status success">Improving</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function Sites() {
  const { selectedSiteId, selectSite } = useMockStore();
  return (
    <>
      <PageHeading
        eyebrow="Sites and cameras"
        title="Keep every location connected"
      >
        <button className="btn btn-primary">Add demo site</button>
      </PageHeading>
      <div className="panel" style={{ marginTop: 22 }}>
        <div className="toolbar">
          {sites.map((site) => (
            <button
              key={site.id}
              className={`btn ${selectedSiteId === site.id ? "btn-primary" : "btn-secondary"}`}
              onClick={() => selectSite(site.id)}
            >
              <MapPin size={16} />
              {site.name}
            </button>
          ))}
        </div>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="muted">Camera health</span>
          <strong>98.4%</strong>
        </div>
        <div className="stat-card">
          <span className="muted">Streams online</span>
          <strong>24 / 24</strong>
        </div>
        <div className="stat-card">
          <span className="muted">Last health check</span>
          <strong style={{ fontSize: 24 }}>30 sec ago</strong>
        </div>
      </div>
      <div className="camera-grid" style={{ marginTop: 18 }}>
        {cameras.map((camera) => (
          <article className="panel camera-card" key={camera.id}>
            <Image
              src={camera.image}
              width={720}
              height={440}
              alt={`Synthetic CCTV feed from ${camera.name}`}
              loading="eager"
            />
            <div className="camera-meta">
              <span>
                <strong>{camera.name}</strong>
                <small
                  className="muted"
                  style={{ display: "block", marginTop: 5 }}
                >
                  {camera.zone} · {camera.id}
                </small>
              </span>
              <span className="status success">{camera.status}</span>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function Settings() {
  const { profile, updateProfile } = useMockStore();
  const [draft, setDraft] = useState<UserProfile>(profile);
  const [saved, setSaved] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!isValidProfile(draft)) return;
    updateProfile(draft);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };
  return (
    <>
      <PageHeading
        eyebrow="Workspace settings"
        title="Manage your organization"
      >
        <Link className="btn btn-secondary" href="/app/settings/billing">
          Billing and plan
        </Link>
      </PageHeading>
      <div className="panel" style={{ marginTop: 22 }}>
        <div className="tabs">
          <button className="active">Profile</button>
          <button>Notifications</button>
          <button>Detection defaults</button>
          <Link href="/app/settings/billing">Billing</Link>
        </div>
        <form
          className="form-stack"
          style={{ maxWidth: 680 }}
          onSubmit={submit}
        >
          <div className="form-row">
            <div className="field-wrap">
              <label htmlFor="settings-name">Name</label>
              <input
                className="field"
                id="settings-name"
                value={draft.name}
                onChange={(event) =>
                  setDraft({ ...draft, name: event.target.value })
                }
              />
            </div>
            <div className="field-wrap">
              <label htmlFor="settings-email">Email</label>
              <input
                className="field"
                id="settings-email"
                type="email"
                value={draft.email}
                onChange={(event) =>
                  setDraft({ ...draft, email: event.target.value })
                }
              />
            </div>
          </div>
          <div className="field-wrap">
            <label htmlFor="settings-company">Company</label>
            <input
              className="field"
              id="settings-company"
              value={draft.company}
              onChange={(event) =>
                setDraft({ ...draft, company: event.target.value })
              }
            />
          </div>
          <div className="field-wrap">
            <label htmlFor="settings-zone">Timezone</label>
            <select
              className="field"
              id="settings-zone"
              value={draft.timezone}
              onChange={(event) =>
                setDraft({ ...draft, timezone: event.target.value })
              }
            >
              <option>Asia/Karachi</option>
              <option>Europe/London</option>
              <option>America/New_York</option>
            </select>
          </div>
          <div>
            <button className="btn btn-primary">Save changes</button>
            {saved && (
              <span className="status success" style={{ marginLeft: 12 }}>
                <CheckCircle size={15} /> Saved
              </span>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export function WorkspaceView({
  section,
}: {
  section: "overview" | "incidents" | "analytics" | "sites" | "settings";
}) {
  const content = {
    overview: <Overview />,
    incidents: <Incidents />,
    analytics: <Analytics />,
    sites: <Sites />,
    settings: <Settings />,
  };
  return <main className="app-content">{content[section]}</main>;
}
