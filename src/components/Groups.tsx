/* eslint-disable @next/next/no-img-element */
import { auth, db } from "@/firebase";
import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, query, where } from "@firebase/firestore";
import Image from "next/image";

const Groups = () => {
  interface Group {
    id: string;
    Name: string;
    Description: string;
    Location: string;
    Tags: string[];
    Image: string;
  }

  const [groups, setGroups] = useState<Group[]>([]);

  const fetchGroups = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const adminEmail = user.email;
        const groupsCollection = collection(db, "Groups");
        const groupsQuery = query(
          groupsCollection,
          where("admin", "==", adminEmail)
        );

        const querySnapshot = await getDocs(groupsQuery);
        if (!querySnapshot.empty) {
          const groupData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Group[];
          setGroups(groupData);
          console.log("Groups:", groupData);
        } else {
          console.log("No groups found");
        }
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };
  useEffect(() => {
    fetchGroups();
  }, []);

  console.log("Groups:", groups);

  return (
    <div className="flex flex-col">
      {groups.map((group) => {
        return (
          <div
            key={group.id}
            className="w-9/12 mt-4 rounded overflow-hidden shadow-lg"
          >
            <img
              className="w-full p-4"
              src={group.Image}
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{group.Name}</div>
              <p className="text-gray-700 text-base">{group.Description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              {group.Tags.map((tag) => {
                return (
                  <span
                    key={tag}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                  >
                    #{tag}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Groups;
