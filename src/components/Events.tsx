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
      console.log("group image", events[0].groupRefrence.id);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div className="flex flex-col">
      {events.map((event: any) => (
        <div
          key={event.id}
          className="w-9/12 mt-4 rounded overflow-hidden shadow-lg"
        >
          <div className="w-3/12">
            {/* <img src={event.groupRefrence.Image} alt="group image" /> */}
          </div>
          <div></div>
        </div>
      ))}
    </div>
  );
};

export default Events;
