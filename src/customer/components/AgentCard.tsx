"use client";

import React from "react";
import Image from "next/image";
import { track } from "./analytics";

export type Property = {
  id: string;
  title: string;
  location?: string;
  price?: string;
  type?: string;
};

type AgentCardProps = {
  property: Property;
  agent?: {
    name: string;
    phone: string;
    avatarUrl?: string;
  };
};

const AgentCard: React.FC<AgentCardProps> = ({
  property,
  agent = {
    name: "Jone Doe",
    phone: "2348012345678",
  },
}) => {
  const waMessage = encodeURIComponent(
    `Hi ${agent.name}, I'm interested in "${property.title}" (${property.id}). Is it still available?`
  );
  const waUrl = `https://wa.me/${agent.phone}?text=${waMessage}`;

  return (
    <aside className="rounded-xl border bg-white text-gray-900 p-4 shadow-sm">
      <div className="flex items-center gap-3">
        {agent.avatarUrl ? (
          <div className="w-14 h-14 relative rounded-full overflow-hidden">
            <Image
              src={agent.avatarUrl}
              alt={agent.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-full bg-[#EBF2FF] flex items-center justify-center text-xl font-semibold text-[#0b0b0b]">
            {agent.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
        )}
        <div>
          <div className="text-sm text-gray-600">Agent</div>
          <div className="font-medium">{agent.name}</div>
          <div className="text-sm text-gray-500">
            {agent.phone.replace(/^234/, "+234")}
          </div>
        </div>
      </div>

      <div className="mt-4 border-t pt-4 space-y-3">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Price: </span>
          <span className="text-base text-[#090040]">
            {property.price ?? "Contact for price"}
          </span>
        </div>

        {/* <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm font-medium"
        >
          Message on WhatsApp
        </a> */}
        <a
          href={`https://wa.me/2348030000000?text=${encodeURIComponent(`Hi, I'm interested in ${property.title} (${property.id}).`)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { id: property.id })}
          className="..."
        >
          WhatsApp
        </a>

        <a
          href={`tel:+${agent.phone}`}
          className="w-full block text-center text-sm border border-gray-200 px-3 py-2 rounded-md hover:bg-gray-50"
        >
          Call Agent
        </a>
      </div>
    </aside>
  );
};

export default AgentCard;
