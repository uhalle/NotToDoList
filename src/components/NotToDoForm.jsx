import React, { useEffect, useState } from "react";
import { getGroups } from "../api/taskApi";

function NotToDoForm({ addTask, userId }) {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [gdescription, setGDescription] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  const [aiReason, setAiReason] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  useEffect(() => {
    getGroups(userId)
      .then((data) => {
        setGroups(data);

        // Don't automatically select a group.
        setSelectedGroup("");
      })
      .catch((err) => {
        console.error("Error fetching groups:", err);
      });
  }, [userId]);

  // When existing group is selected
  const handleExistingGroupChange = (e) => {
    const value = e.target.value;

    setSelectedGroup(value);

    // Clear new group
    setGDescription("");
  };

  // When user types a new group
  const handleNewGroupChange = (e) => {
    const value = e.target.value;

    setGDescription(value);

    // Clear existing group
    if (value.trim() !== "") {
      setSelectedGroup("");
    }
  };

  const handleAISuggest = async () => {
    if (!description.trim()) {
      setAiError("Please enter a task description first.");
      return;
    }

    setAiLoading(true);
    setAiError("");
    setAiReason("");

    try {
      const response = await fetch("/api/ai/suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
        }),
      });

      if (!response.ok) {
        throw new Error("AI request failed");
      }

      const data = await response.json();

      setPriority(data.priority);
      setAiReason(data.reason);

      // Check whether AI suggested an existing group
      const matchingGroup = groups.find(
        (group) =>
          group.name?.toLowerCase() ===
          data.group?.toLowerCase()
      );

      if (matchingGroup) {
        // Existing group selected
        setSelectedGroup(matchingGroup.name);

        // Clear new group
        setGDescription("");
      } else {
        // New group selected
        setGDescription(data.group || "");

        // Clear existing group
        setSelectedGroup("");
      }
    } catch (error) {
      console.error("AI suggestion error:", error);
      setAiError("Unable to get AI suggestion.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description.trim()) {
      return;
    }

    // Make sure a group is selected
    if (!selectedGroup && !gdescription.trim()) {
      alert("Please select an existing group or enter a new group.");
      return;
    }

    addTask({
      description,
      priority,
      gdescription,
      selectedGroup,
    });

    // Reset form
    setDescription("");
    setPriority("LOW");
    setSelectedGroup("");
    setGDescription("");
    setAiReason("");
    setAiError("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            padding: "8px",
            width: "100%",
          }}
        />

        <button
          type="button"
          onClick={handleAISuggest}
          disabled={aiLoading}
          style={{
            padding: "10px",
            cursor: aiLoading ? "not-allowed" : "pointer",
          }}
        >
          {aiLoading ? "🤖 Thinking..." : "✨ AI Suggest"}
        </button>

        {aiError && (
          <p style={{ color: "red", margin: 0 }}>
            {aiError}
          </p>
        )}

        {aiReason && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#f5f5f5",
              borderRadius: "5px",
            }}
          >
            <strong>AI Suggestion:</strong>
            <p style={{ marginBottom: 0 }}>
              {aiReason}
            </p>
          </div>
        )}

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{
            padding: "8px",
            width: "100%",
          }}
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        {/* Existing Group */}
        <select
          value={selectedGroup}
          onChange={handleExistingGroupChange}
          disabled={gdescription.trim() !== ""}
          style={{
            padding: "8px",
            width: "100%",
          }}
        >
          <option value="">
            Existing Group
          </option>

          {groups
            .filter(
              (group) =>
                group.name &&
                group.name.trim() !== ""
            )
            .map((group) => (
              <option
                key={group.id}
                value={group.name}
              >
                {group.name}
              </option>
            ))}
        </select>

        {/* New Group */}
        <input
          type="text"
          placeholder="Enter if new group"
          value={gdescription}
          onChange={handleNewGroupChange}
          disabled={selectedGroup !== ""}
          style={{
            padding: "8px",
            width: "100%",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            width: "100%",
          }}
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default NotToDoForm;