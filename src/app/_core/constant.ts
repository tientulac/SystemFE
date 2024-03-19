export const LIST_STATUS_CATEGORY_TYPE = [
    { id: 0, code: 'Show', name: 'Hiển thị' },
    { id: 1, code: 'Hide', name: 'Ẩn' },
    { id: 2, code: 'Approve', name: 'Đã duyệt' },
    { id: 3, code: 'AwaitingApprove', name: 'Chờ duyệt' },
];

export const LIST_STATUS_CATEGORY = [
    { id: 0, code: 'Show', name: 'Hiển thị' },
    { id: 1, code: 'Hide', name: 'Ẩn' },
    { id: 2, code: 'Approve', name: 'Đã duyệt' },
    { id: 3, code: 'AwaitingApprove', name: 'Chờ duyệt' },
];


export const LIST_STATUS_BLOG = [
    { id: 0, code: 'Show', name: 'Hiển thị' },
    { id: 1, code: 'Hide', name: 'Ẩn' },
    { id: 2, code: 'Approve', name: 'Đã duyệt' },
    { id: 3, code: 'AwaitingApprove', name: 'Chờ duyệt' },
];

export const LIST_TYPE_BLOG = [
    { id: 0, code: 'Text', name: 'Text' },
    { id: 1, code: 'File', name: 'File' },
    { id: 2, code: 'File', name: 'Podcast' },
    { id: 3, code: 'File', name: 'Image' },
];

export const LIST_STATUS_USER = [
    { id: 1, code: 'Active', name: 'Kích hoạt' },
    { id: 2, code: 'Disable', name: 'Ẩn' },
    { id: 3, code: 'Ban', name: 'Đã Khóa' },
    { id: 4, code: 'Approve', name: 'Duyệt' },
    { id: 5, code: 'AwaitingApprove', name: 'Chờ duyệt' },
];

export const LIST_STATUS_RATING_BLOG = [
    { id: 0, code: 'Show', name: 'Hiển thị' },
    { id: 1, code: 'Hide', name: 'Ẩn' },
    { id: 2, code: 'Approve', name: 'Đã duyệt' },
    { id: 3, code: 'AwaitingApprove', name: 'Chờ duyệt' },
];

export const LIST_TYPE_RATING_BLOG = [
    { id: 0, code: 'Text', name: 'Text' },
    { id: 1, code: 'File', name: 'File' },
];

export const LIST_TYPE_NOTIFYCATION = [
    { id: 0, code: 'Blog', name: 'Bài viết' },
    { id: 1, code: 'Rating', name: 'Đánh giá' },
    { id: 2, code: 'Favorite', name: 'Like' },
];

export const LIST_STATUS_NOTIFYCATION = [
    { id: 0, code: 'Show', name: 'Hiển thị' },
    { id: 1, code: 'Hide', name: 'Ẩn' },
    { id: 2, code: 'Approve', name: 'Đã duyệt' },
    { id: 3, code: 'AwaitingApprove', name: 'Chờ duyệt' },
];

export const LIST_TYPE_SYSTEM_LOG = [
    { id: 1, code: 'LOGIN', name: 'Đăng nhập' },
    { id: 2, code: 'INSERT', name: 'Thêm mới' },
    { id: 3, code: 'UPDATE', name: 'Cập nhật' },
    { id: 4, code: 'DELETE', name: 'Xóa' },
    { id: 5, code: 'APPROVE', name: 'Duyệt' },
    { id: 6, code: 'SENDMAIL', name: 'Gửi mail' },
    { id: 7, code: 'CHANGEPASS', name: 'Đổi mật khẩu' },
    { id: 8, code: 'REGISTER', name: 'Đăng ký' },
    { id: 9, code: 'OTHER', name: 'Khác' },
];

export const ROUTE_PATH = {
    TOPIC_TYPE: 'category/topic-type',
    TOPIC: 'category/topic',
    BLOG: 'feature/blog',
    ROLE: 'feature/role',
    USER: 'feature/user',
    NOTIFYCATION: 'feature/notifycation',
    SYSTEM_LOG: 'feature/system-log',
}