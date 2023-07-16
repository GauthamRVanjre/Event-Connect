/* eslint-disable @next/next/no-img-element */
import { db } from "@/firebase";
import { DocumentData, collection, getDocs } from "@firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState<DocumentData>([]);

  interface Event {
    id: string;
    eventName: string;
    eventDetails: string;
    eventLocation: string;
    eventImage: string;
    eventStartDate: EventDate;
    eventEndDate: EventDate;
  }

  interface EventDate {
    seconds: number;
  }

  const fetchEvents = async () => {
    try {
      const eventsCollection = await getDocs(collection(db, "Events"));
      const events = eventsCollection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(events);
      console.log("Events:", events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleDate = (seconds: number) => {
    const date = new Date(seconds * 1000);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div className="flex flex-col">
      {events.map((event: Event) => {
        return (
          <Link href={`/Event/${event.id}`} key={event.id}>
            <div
              key={event.id}
              className="lg:w-9/12 md:w-12/12 mt-4 rounded overflow-hidden shadow-lg h-36 flex"
            >
              <div className="w-3/12">
                <img
                  src={event.eventImage}
                  alt="group image"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="w-6/12">
                <div className="px-12 py-4">
                  <div className="font-bold text-xl mb-2">
                    {event.eventName}
                  </div>
                  <p className="text-gray-700 text-base">
                    {event.eventDetails}
                  </p>
                </div>
              </div>
              <div className="w-3/12">
                <div className="px-6 py-4">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    Start- {handleDate(event.eventStartDate.seconds)}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    End- {handleDate(event.eventEndDate.seconds)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Events;
