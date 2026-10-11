
import { useEffect, useState } from "react";
import { getMoodEntries } from "../services/moodStorage";
import { getSevenDayMoodTrend } from "../services/moodTrendService";

interface MoodTrendProps {
  refreshKey: number;
}

function MoodTrend({ refreshKey }: MoodTrendProps) {
  const [trend, setTrend] = useState<
    ReturnType<typeof getSevenDayMoodTrend>
  >([]);

  useEffect(() => {
    setTrend(getSevenDayMoodTrend(getMoodEntries()));
  }, [refreshKey]);

  return (
    <section className="mood-trend-card">
      <h2>Your 7-Day Check-In Trend</h2>
      <p>See how often you've checked in each day.</p>

      <div className="mood-trend-chart">
        {trend.map((day) => {
          const date = new Date(`${day.date}T12:00:00`);
          const label = date.toLocaleDateString("en", {
            weekday: "short",
          });

          return (
            <div className="mood-trend-day" key={day.date}>
              <span className="mood-trend-count">{day.count}</span>

              <div className="mood-trend-bar-track">
                <div
                  className="mood-trend-bar"
                  style={{
                    height: `${
                      day.count === 0
                        ? 0
                        : Math.max(
                            12,
                            (day.count /
                              Math.max(1, ...trend.map((item) => item.count))) *
                              100
                          )
                    }%`,
                  }}
                />
              </div>

              <span className="mood-trend-label">{label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default MoodTrend;
