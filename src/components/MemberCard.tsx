import React from 'react';
import { Member } from '../types';

interface MemberCardProps {
  member: Member;
  onEdit?: (member: Member) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onEdit, onDelete, isAdmin }) => {
  return (
    <div className="member-card">
      <div className="member-badge">{member.noAbsen}</div>
      <img src={member.photo} alt={member.name} className="member-image" />
      <div className="member-info">
        <h3 className="member-name">{member.name}</h3>
        <p className="member-role">{member.role}</p>
      </div>
      {isAdmin && onEdit && onDelete && (
        <div style={{ padding: '0 20px 20px', display: 'flex', gap: '10px' }}>
          <button className="btn-edit" onClick={() => onEdit(member)}>Edit</button>
          <button className="btn-danger" onClick={() => onDelete(member.id)}>Hapus</button>
        </div>
      )}
    </div>
  );
};

export default MemberCard;