"use client";

import {
  ArrowsOut,
  Buildings,
  Camera,
  CheckCircle,
  Clock,
  DownloadSimple,
  DotsThree,
  Funnel,
  MagnifyingGlass,
  MapPin,
  Minus,
  Pause,
  Plus,
  Pulse,
  ShieldCheck,
  SpeakerHigh,
  SquaresFour,
  Users,
  VideoCamera,
  Warning,
  WarningCircle,
  X,
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

const overviewActivity = [
  [
    "10:41:58 AM",
    "Warehouse A - Aisle 12",
    "Person in restricted zone",
    "AI Detection",
    "Critical",
    "danger",
    "Camera NW-A-12",
    "/images/warehouse-aisle-person-camera.png",
  ],
  [
    "10:39:12 AM",
    "Warehouse B - Loading Dock 3",
    "Unattended object detected",
    "AI Detection",
    "High",
    "warning",
    "Camera NW-B-03",
    "/images/receiving-dock-camera.png",
  ],
  [
    "10:35:47 AM",
    "Main Entrance - Exterior",
    "Vehicle entry",
    "Access Control",
    "Info",
    "success",
    "Camera EXT-01",
    "/images/parking-perimeter-camera.png",
  ],
  [
    "10:33:05 AM",
    "Employee Entrance",
    "Authorized access",
    "Access Control",
    "Info",
    "success",
    "Access Reader ER-02",
    "",
  ],
  [
    "10:31:22 AM",
    "System",
    "Camera health check",
    "System",
    "Info",
    "success",
    "—",
    "",
  ],
] as const;

function Overview() {
  const [level, setLevel] = useState("1");
  const [insightOpen, setInsightOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [layers, setLayers] = useState({
    cameras: true,
    coverage: true,
    zones: true,
    incidents: true,
    traffic: false,
  });
  const visibleEvents = overviewActivity.filter((item) =>
    `${item[1]} ${item[2]} ${item[6]}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <section className="operations-overview">
      <div className="overview-summary">
        <div className="facility-summary">
          <button>
            Northview Distribution Center <span aria-hidden="true">⌄</span>
          </button>
          <span>
            <i />
            All systems operational
          </span>
        </div>
        <div className="overview-kpis">
          <div className="overview-kpi">
            <span className="kpi-icon green">
              <VideoCamera size={22} />
            </span>
            <span>
              <small>Cameras Online</small>
              <strong>
                128 <em>/ 134</em>
              </strong>
            </span>
          </div>
          <div className="overview-kpi">
            <span className="kpi-icon red">
              <WarningCircle size={22} />
            </span>
            <span>
              <small>Active Incidents</small>
              <strong className="critical-number">2</strong>
            </span>
          </div>
          <div className="overview-kpi">
            <span className="kpi-icon blue">
              <SquaresFour size={22} />
            </span>
            <span>
              <small>Areas Monitored</small>
              <strong>
                24 <em>/ 28</em>
              </strong>
            </span>
          </div>
          <div className="overview-kpi">
            <span className="kpi-icon gray">
              <Users size={22} />
            </span>
            <span>
              <small>People On-site</small>
              <strong>42</strong>
            </span>
          </div>
        </div>
        <div className="site-time">
          <small>Site Time</small>
          <strong>
            10:42:31 AM <em>PDT</em>
          </strong>
        </div>
      </div>

      <div
        className={`overview-workspace ${insightOpen ? "" : "insight-collapsed"}`}
      >
        <aside className="map-controls" aria-label="Map controls">
          <div className="levels-control">
            <strong>Levels</strong>
            {["3", "2", "1", "G"].map((item) => (
              <button
                key={item}
                className={level === item ? "active" : ""}
                onClick={() => setLevel(item)}
                aria-pressed={level === item}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="layers-control">
            <strong>Layers</strong>
            {(
              [
                ["cameras", "Cameras"],
                ["coverage", "Coverage"],
                ["zones", "Zones"],
                ["incidents", "Incidents"],
                ["traffic", "Traffic Flow"],
              ] as const
            ).map(([key, label]) => (
              <label key={key}>
                <input
                  type="checkbox"
                  checked={layers[key]}
                  onChange={(event) =>
                    setLayers({ ...layers, [key]: event.target.checked })
                  }
                />
                {label}
              </label>
            ))}
          </div>
          <div className="zoom-control">
            <button aria-label="Zoom in">
              <Plus size={17} />
            </button>
            <button aria-label="Zoom out">
              <Minus size={17} />
            </button>
            <button aria-label="Fit map">
              <ArrowsOut size={16} />
            </button>
          </div>
        </aside>

        <section
          className="facility-map-panel"
          aria-label={`Facility map level ${level}`}
        >
          <div className="facility-map-frame">
            <Image
              src="/images/warehouse-floorplan.png"
              alt="Level one warehouse floorplan with AI camera coverage"
              width={1680}
              height={945}
              priority
            />
            {layers.cameras && (
              <div className="map-markers" aria-label="Camera positions">
                {[
                  ["18%", "22%"],
                  ["47%", "14%"],
                  ["89%", "22%"],
                  ["38%", "47%"],
                  ["74%", "47%"],
                  ["40%", "73%"],
                  ["35%", "91%"],
                ].map(([left, top], index) => (
                  <button
                    key={`${left}-${top}`}
                    style={{ left, top }}
                    aria-label={`Open camera ${index + 1}`}
                  >
                    <VideoCamera size={16} weight="fill" />
                  </button>
                ))}
              </div>
            )}
            {layers.incidents && (
              <>
                <Link
                  href="/app/incidents"
                  className="map-incident critical"
                  style={{ left: "52%", top: "42%" }}
                  aria-label="Open critical incident"
                >
                  <WarningCircle size={24} weight="fill" />
                </Link>
                <Link
                  href="/app/incidents"
                  className="map-incident high"
                  style={{ left: "52%", top: "68%" }}
                  aria-label="Open high priority incident"
                >
                  <Warning size={22} weight="fill" />
                </Link>
              </>
            )}
            <span
              className="current-position"
              aria-label="Current responder position"
            />
          </div>
          <div className="map-legend">
            <span>
              <VideoCamera size={14} weight="fill" />
              Camera
            </span>
            <span>
              <i className="coverage-key" />
              Coverage
            </span>
            <span>
              <i className="perimeter-key" />
              Site Perimeter
            </span>
            <span className="legend-critical">
              <WarningCircle size={14} weight="fill" />
              Critical
            </span>
            <span className="legend-high">
              <Warning size={14} weight="fill" />
              High
            </span>
          </div>
        </section>

        {insightOpen ? (
          <aside className="live-insight-panel">
            <div className="live-insight-title">
              <strong>WAREHOUSE A - AISLE 12</strong>
              <span className="status success">● Live</span>
              <button
                onClick={() => setInsightOpen(false)}
                aria-label="Close camera insight"
              >
                <X size={19} />
              </button>
            </div>
            <div className="live-camera-feed">
              <Image
                src="/images/warehouse-aisle-person-camera.png"
                alt="Synthetic live CCTV view of Warehouse A aisle 12"
                width={720}
                height={440}
                loading="eager"
                style={{ width: "100%", height: "var(--live-feed-height)" }}
              />
              <div className="detection-box">
                <span>Person</span>
              </div>
              <div className="video-controls">
                <span>
                  <Pause size={18} weight="fill" />
                  <SpeakerHigh size={18} />
                </span>
                <span>
                  <Camera size={18} />
                  <span className="hd-badge">HD</span>
                  <ArrowsOut size={18} />
                </span>
              </div>
            </div>
            <div className="ai-insight-body">
              <div className="insight-heading">
                <strong>AI Insights</strong>
                <small>Today 10:41:58 AM</small>
              </div>
              <div className="insight-alert">
                <strong>Person detected in restricted zone</strong>
                <span>
                  Confidence: 92% <em>● Critical</em>
                </span>
              </div>
              <div className="insight-metrics">
                <span>
                  <small>Zone</small>
                  <strong>Warehouse A - Aisle 12</strong>
                </span>
                <span>
                  <small>Duration</small>
                  <strong>00:00:07</strong>
                </span>
                <span>
                  <small>Last seen</small>
                  <strong>10:41:58 AM</strong>
                </span>
              </div>
              <Link href="/app/incidents">
                View related history <span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>
        ) : (
          <button
            className="reopen-insight"
            onClick={() => setInsightOpen(true)}
          >
            Open live insight
          </button>
        )}
      </div>

      <section className="activity-stream">
        <header>
          <div>
            <h2>Activity Stream</h2>
            <button>
              <Funnel size={16} />
              Filters
            </button>
          </div>
          <div className="activity-actions">
            <label>
              <MagnifyingGlass size={17} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search events..."
              />
            </label>
            <Link href="/app/incidents">Open incident workspace</Link>
          </div>
        </header>
        <div className="activity-table-wrap">
          <table className="activity-table">
            <tbody>
              {visibleEvents.map((item, index) => (
                <tr key={`${item[0]}-${item[6]}`}>
                  <td>
                    <span className={`event-icon ${item[5]}`}>
                      {index === 0 ? (
                        <WarningCircle size={18} weight="fill" />
                      ) : index === 1 ? (
                        <Warning size={18} weight="fill" />
                      ) : index === 2 ? (
                        <Users size={18} />
                      ) : (
                        <CheckCircle size={18} weight="fill" />
                      )}
                    </span>
                  </td>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>{item[3]}</td>
                  <td>
                    <span className={`event-severity ${item[5]}`}>
                      ● {item[4]}
                    </span>
                  </td>
                  <td>
                    {item[7] ? (
                      <Image
                        src={item[7]}
                        width={52}
                        height={30}
                        alt=""
                        loading="eager"
                      />
                    ) : (
                      <span className="device-placeholder">
                        <Buildings size={15} />
                      </span>
                    )}
                  </td>
                  <td>{item[6]}</td>
                  <td>
                    <button aria-label={`More options for ${item[2]}`}>
                      <DotsThree size={20} weight="bold" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link className="view-all-events" href="/app/incidents">
          View all events <span aria-hidden="true">↓</span>
        </Link>
      </section>
    </section>
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
  return (
    <main
      className={`app-content ${section === "overview" ? "overview-content" : ""}`}
    >
      {content[section]}
    </main>
  );
}
