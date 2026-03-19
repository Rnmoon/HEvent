'use client';

import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';

interface Member {
  name: string;
  role: string;
  imageUrl: string;
}

const members: Member[] = [
  { name: 'Raviraj Sarvade', role: 'President', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Sumit Talwade', role: 'Vice President', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Ganesh Ingole', role: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Tanish Sidam', role: 'Treasurer', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Emma Brocklehurst', role: 'Head of Real Estate Finance', imageUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Jack Tooley', role: 'Investment Director', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'James Mitchell', role: 'Group Finance Director', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Joe Jack Williams', role: 'Head of Regenerative Strategy', imageUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'John Holley', role: 'Investment Director', imageUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Josh Shapland', role: 'Group Finance Accountant', imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Julian Stocks', role: 'Senior Advisor', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Kate Aspbury', role: 'Real Estate Analyst', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Amber Hawkes', role: 'Marketing Director', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Amber Wren', role: 'Associate Development Manager', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Andrea Tanzi', role: 'Investment Analyst', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Christian Riley', role: 'Development Manager', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Emma Brocklehurst', role: 'Head of Real Estate Finance', imageUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Jack Tooley', role: 'Investment Director', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'James Mitchell', role: 'Group Finance Director', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Joe Jack Williams', role: 'Head of Regenerative Strategy', imageUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'John Holley', role: 'Investment Director', imageUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Josh Shapland', role: 'Group Finance Accountant', imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Julian Stocks', role: 'Senior Advisor', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Kate Aspbury', role: 'Real Estate Analyst', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop' },
];

export default function CommitteeMembers() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="w-full py-24 bg-black px-4 sm:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <span className="text-accent-blue text-sm font-bold tracking-widest uppercase block mb-4">Our Team</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">Committee Members</h2>
          </div>
          <div className="hidden md:block">
            <button className="text-accent-blue hover:text-white transition-colors flex items-center gap-2 group">
              <span className="text-sm font-bold uppercase tracking-widest">Connect With Us</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, index) => (
            <div 
              key={index}
              className={`
                group relative flex items-center gap-6 p-6 bg-[#0a0a0a] border border-white/5 
                md:hover:border-accent-blue/50 transition-all duration-300 rounded-lg overflow-hidden
                ${index >= 8 && !showAll ? 'hidden md:flex' : 'flex'}
              `}
            >
              {/* Image Section */}
              <div className="relative w-24 h-24 flex-shrink-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-500">
                <img 
                  src={member.imageUrl} 
                  alt={member.name} 
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              {/* Info Section */}
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-white md:group-hover:text-accent-blue transition-colors">
                  {member.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{member.role}</p>
              </div>

              {/* Arrow Icon */}
              <div className="absolute top-4 right-4">
                {/* <ArrowUpRight className="w-5 h-5 text-gray-700 group-hover:text-accent-blue transition-colors duration-300" /> */}
              </div>

              {/* Hover effect background glow - Only on Desktop */}
              <div className="hidden md:block absolute -bottom-10 -right-10 w-32 h-32 bg-accent-blue/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Mobile "See More" Button */}
        {!showAll && members.length > 8 && (
          <div className="mt-12 flex justify-center md:hidden">
            <button 
              onClick={() => setShowAll(true)}
              className="group flex items-center gap-2 text-accent-blue border border-accent-blue/30 px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-accent-blue hover:text-white transition-all bg-[#0a0a0a]"
            >
              <span>See More</span>
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        )}

        {/* Mobile "See Less" Button (Optional, but good for UX) */}
        {showAll && (
          <div className="mt-12 flex justify-center md:hidden">
            <button 
              onClick={() => setShowAll(false)}
              className="group flex items-center gap-2 text-accent-blue border border-accent-blue/30 px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-accent-blue hover:text-white transition-all bg-[#0a0a0a]"
            >
              <span>See Less</span>
              <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        )}

        <div className="mt-12 md:hidden">
          <button className="text-accent-blue hover:text-white transition-colors flex items-center gap-2 group">
            <span className="text-sm font-bold uppercase tracking-widest">Connect With Us</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
