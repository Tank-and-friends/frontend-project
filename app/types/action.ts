import React from 'react';

export interface Action {
  /** id của action */
  id?: string;
  /** url của action */
  url?: string;
  /** Action icon */
  icon?: React.ReactNode;
  /** Nội dung của action */
  content?: string;
  /** Callback của action */
  onAction?(): void;
}

export interface LoadableAction extends Action {
  /** Action có đang loading */
  loading?: boolean;
}

export interface DisableableAction extends Action {
  /** Disable action */
  disabled?: boolean;
}

export interface DestructableAction extends Action {
  /** Destructive action */
  destructive?: boolean;
}
export interface ComplexAction
  extends DisableableAction,
    DestructableAction,
    LoadableAction {}

export interface ActionListItemDescriptor
  extends DisableableAction,
    DestructableAction {
  /** Nhãn hỗ trợ của hành động */
  accessibilityLabel?: string;
  /** Dòng mô tả của hành động */
  helpText?: React.ReactNode;
  /** Icon của hành động */
  icon?: React.ReactNode;
  /** Phần từ đứng trước tên hành động */
  prefix?: React.ReactNode;
  /** Phần từ đứng sau tên hành động */
  suffix?: React.ReactNode;
  /** Thêm ellipsis vào tên hành động */
  ellipsis?: boolean;
  /** Hành động đang active */
  active?: boolean;
  /** truncate nội dung */
  truncate?: boolean;
}

export interface ActionListSection {
  /** Tiêu để của nhóm hành động */
  title?: string;
  /** Danh sách các hành động */
  items: ActionListItemDescriptor[];
}
