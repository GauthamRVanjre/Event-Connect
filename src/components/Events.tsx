import { db } from "@/firebase";
import { DocumentData, collection, getDocs } from "@firebase/firestore";
import React, { useState, useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState<DocumentData>([]);

  const fetchEvents = async () => {
    try {
      const eventsCollection = await getDocs(collection(db, "Events"));
      const events = eventsCollection.docs.map((doc) => doc.data());
      setEvents(events);
      console.log("Events:", events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    // fetchEvents();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="w-9/12 mt-4 rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Event Name</div>
          <p className="text-gray-700 text-base">Event Description</p>
        </div>
      </div>
    </div>
  );
};

export default Events;
