import { useRef, useState } from 'react'

type IconName =
  | 'back'
  | 'camera'
  | 'card'
  | 'chevron'
  | 'copy'
  | 'headset'
  | 'lock'
  | 'logout'
  | 'moon'
  | 'profile'
  | 'shield'
  | 'trash'
  | 'wallet'

type Sheet = 'password' | 'contact' | 'withdraw' | null
type Inquiry = {
  id: number
  content: string
  createdAt: string
  answered: boolean
}

type AuthProvider = 'email' | 'kakao' | 'naver' | 'google'

type UserProfile = {
  nickname: string
  email: string
  uid: string
  avatarUrl: string
  provider: AuthProvider
}

const MOCK_USER = {
  nickname: '별빛여우',
  email: 'starfox@example.com',
  uid: 'USR-20240318-A7F2',
  avatarUrl:
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&h=240&fit=crop&auto=format',
  provider: 'email',
} satisfies UserProfile

const providerMeta: Record<Exclude<AuthProvider, 'email'>, { label: string; badge: string }> = {
  kakao: { label: '카카오', badge: 'bg-yellow-300 text-slate-900' },
  naver: { label: '네이버', badge: 'bg-green-500 text-white' },
  google: { label: 'Google', badge: 'bg-white text-slate-700' },
}

const cards = [
  { brand: 'VISA', number: '•••• 4242', tone: 'bg-blue-700' },
  { brand: 'mastercard', number: '•••• 8833', tone: 'bg-red-500' },
]

const accounts = [
  { bank: '카카오뱅크', number: '3333-••••-7821', tone: 'bg-yellow-300' },
  { bank: '신한은행', number: '110-••••-2049', tone: 'bg-blue-500' },
]

function Icon({ name, className = 'size-5' }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    back: <path d="m15 18-6-6 6-6" />,
    camera: (
      <>
        <path d="M14.5 4 16 6h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l1.5-2h5Z" />
        <circle cx="12" cy="13" r="3" />
      </>
    ),
    card: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18M7 15h3" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    copy: (
      <>
        <rect x="9" y="9" width="11" height="11" rx="2" />
        <path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" />
      </>
    ),
    headset: (
      <>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <path d="M18 19c0 1.1-.9 2-2 2h-3M4 14a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2ZM20 14a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2Z" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5M15 12H3" />
        <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
      </>
    ),
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />,
    profile: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    trash: (
      <>
        <path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v5M14 11v5" />
      </>
    ),
    wallet: (
      <>
        <path d="M4 5h14a2 2 0 0 1 2 2v12H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
        <path d="M16 11h6v4h-6a2 2 0 0 1 0-4Z" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

function SettingRow({
  icon,
  title,
  description,
  onClick,
  trailing,
  danger = false,
}: {
  icon: IconName
  title: string
  description?: string
  onClick?: () => void
  trailing?: React.ReactNode
  danger?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3.5 px-4 py-4 text-left transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary dark:hover:bg-slate-800"
    >
      <span
        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
          danger ? 'bg-red-50 text-red-500 dark:bg-red-950/40' : 'bg-blue-50 text-primary dark:bg-blue-950/60 dark:text-blue-400'
        }`}
      >
        <Icon name={icon} />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block text-sm font-semibold ${danger ? 'text-red-500' : 'text-slate-800 dark:text-slate-100'}`}>
          {title}
        </span>
        {description && <span className="mt-0.5 block text-xs text-slate-400 dark:text-slate-500">{description}</span>}
      </span>
      {trailing ?? <Icon name="chevron" className="size-4 text-slate-300 transition-transform group-hover:translate-x-0.5 dark:text-slate-600" />}
    </button>
  )
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={checked}
      onClick={(event) => {
        event.stopPropagation()
        onChange()
      }}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-600'}`}
    >
      <span
        className={`absolute left-0 top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

function Sheet({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode
  onClose: () => void
  title: string
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <section
        aria-label={title}
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl dark:bg-slate-900 sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-slate-200 dark:bg-slate-700 sm:hidden" />
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-400 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-slate-700"
            aria-label="닫기"
          >
            ×
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-500 dark:focus:bg-slate-800 dark:focus:ring-blue-950"
      />
    </label>
  )
}

export default function App() {
  const [user, setUser] = useState<UserProfile>(MOCK_USER)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [editingName, setEditingName] = useState(false)
  const [nickname, setNickname] = useState(user.nickname)
  const [darkMode, setDarkMode] = useState(false)
  const [apiConsent, setApiConsent] = useState(true)
  const [sheet, setSheet] = useState<Sheet>(null)
  const [password, setPassword] = useState({ current: '', next: '', confirm: '' })
  const [passwordMessage, setPasswordMessage] = useState('')
  const [contact, setContact] = useState('')
  const [contactMode, setContactMode] = useState<'history' | 'form'>('history')
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [withdrawConfirm, setWithdrawConfirm] = useState('')
  const [toast, setToast] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  function showToast(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(''), 1800)
  }

  function saveNickname() {
    if (!nickname.trim()) return
    setUser((current) => ({ ...current, nickname: nickname.trim() }))
    setEditingName(false)
    showToast('닉네임이 저장되었습니다')
  }

  function changeAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) setAvatarPreview(URL.createObjectURL(file))
  }

  function submitPassword(event: React.FormEvent) {
    event.preventDefault()
    if (!password.current) return setPasswordMessage('현재 비밀번호를 입력해주세요.')
    if (password.next.length < 8) return setPasswordMessage('새 비밀번호는 8자 이상이어야 합니다.')
    if (password.next !== password.confirm) return setPasswordMessage('새 비밀번호가 일치하지 않습니다.')
    setSheet(null)
    setPassword({ current: '', next: '', confirm: '' })
    setPasswordMessage('')
    showToast('비밀번호가 변경되었습니다')
  }

  return (
    <main className={`${darkMode ? 'dark' : ''} min-h-screen bg-app py-0 transition-colors dark:bg-slate-950 sm:py-8`}>
      <div className="mx-auto min-h-screen max-w-md overflow-hidden bg-app shadow-none transition-colors dark:bg-slate-900 sm:min-h-0 sm:rounded-3xl sm:shadow-xl">
        <header className="safe-header flex items-center justify-between px-5 pb-4">
          <button type="button" className="flex size-10 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-white dark:text-slate-200 dark:hover:bg-slate-800" aria-label="뒤로가기">
            <Icon name="back" />
          </button>
          <h1 className="text-base font-bold text-slate-900 dark:text-white">내 정보</h1>
          <span className="size-10" />
        </header>

        <div className="space-y-5 px-4 pb-28">
          <section className="relative overflow-hidden rounded-3xl bg-primary p-5 text-white shadow-blue">
            <div className="relative flex items-center gap-4">
              <button type="button" className="group relative shrink-0 rounded-full" onClick={() => fileRef.current?.click()} aria-label="프로필 사진 변경">
                <img
                  className="size-20 rounded-full border-4 border-white/25 object-cover"
                  src={avatarPreview ?? user.avatarUrl}
                  alt="프로필"
                />
                <span className="absolute bottom-0 right-0 flex size-7 items-center justify-center rounded-full border-2 border-primary bg-white text-primary shadow-sm">
                  <Icon name="camera" className="size-3.5" />
                </span>
              </button>
              <input ref={fileRef} className="hidden" type="file" accept="image/*" onChange={changeAvatar} />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-blue-100">안녕하세요,</p>
                {editingName ? (
                  <div className="mt-1">
                    <input
                      autoFocus
                      value={nickname}
                      maxLength={20}
                      onChange={(event) => setNickname(event.target.value)}
                      onBlur={saveNickname}
                      onKeyDown={(event) => event.key === 'Enter' && saveNickname()}
                      className="w-full rounded-lg border border-white/30 bg-white/15 px-3 py-1.5 text-sm font-bold text-white outline-none placeholder:text-blue-100 focus:bg-white/20"
                    />
                  </div>
                ) : (
                  <button type="button" className="mt-0.5 block max-w-full text-left" onClick={() => setEditingName(true)}>
                    <span className="truncate text-xl font-bold">{user.nickname}</span>
                  </button>
                )}
                <p className="mt-1.5 truncate text-xs text-blue-100">{user.email}</p>
                {user.provider !== 'email' && (
                  <span className={`mt-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-bold ${providerMeta[user.provider].badge}`}>
                    {providerMeta[user.provider].label} 계정
                  </span>
                )}
              </div>
            </div>
            <div className="relative mt-5 flex items-center justify-between rounded-2xl bg-blue-800/25 px-4 py-3">
              <div>
                <p className="text-xs text-blue-100">고유 ID</p>
                <p className="mt-0.5 text-sm font-semibold tracking-wide">{user.uid}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(user.uid)
                  showToast('고유 ID를 복사했습니다')
                }}
                className="flex size-9 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="고유 ID 복사"
              >
                <Icon name="copy" className="size-4" />
              </button>
            </div>
          </section>

          <section>
            <h2 className="mb-2 px-1 text-xs font-bold text-slate-400 dark:text-slate-500">계정 및 보안</h2>
            <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-850">
              <SettingRow icon="lock" title="비밀번호 변경" description="안전한 비밀번호로 계정을 보호하세요" onClick={() => setSheet('password')} />
              <SettingRow
                icon="shield"
                title="API 데이터 활용 동의"
                description={apiConsent ? '서비스 개선을 위한 활용에 동의 중' : '데이터 활용에 동의하지 않음'}
                trailing={<Toggle checked={apiConsent} onChange={() => setApiConsent((value) => !value)} label="API 데이터 활용 동의" />}
              />
            </div>
          </section>

          <section>
            <h2 className="mb-2 px-1 text-xs font-bold text-slate-400 dark:text-slate-500">연결된 카드 및 계좌</h2>
            <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-850">
              <div className="flex items-center gap-3.5 px-4 py-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary dark:bg-blue-950/60 dark:text-blue-400">
                  <Icon name="card" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">연결된 카드</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {cards.map((card) => (
                      <span key={card.number} className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-2 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        <span className={`h-3 w-5 rounded-sm ${card.tone}`} />
                        {card.brand} {card.number}
                      </span>
                    ))}
                  </div>
                </div>
                <Icon name="chevron" className="size-4 shrink-0 text-slate-300" />
              </div>
              <div className="flex items-center gap-3.5 px-4 py-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary dark:bg-blue-950/60 dark:text-blue-400">
                  <Icon name="wallet" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">연결된 계좌</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {accounts.map((account) => (
                      <span key={account.number} className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-2 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        <span className={`size-3 rounded-full ${account.tone}`} />
                        {account.bank} {account.number}
                      </span>
                    ))}
                  </div>
                </div>
                <Icon name="chevron" className="size-4 shrink-0 text-slate-300" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-2 px-1 text-xs font-bold text-slate-400 dark:text-slate-500">앱 설정</h2>
            <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-850">
              <SettingRow
                icon="moon"
                title="다크 모드"
                description="눈이 편안한 어두운 화면"
                trailing={<Toggle checked={darkMode} onChange={() => setDarkMode((value) => !value)} label="다크 모드" />}
              />
              <SettingRow
                icon="headset"
                title="문의하기"
                description={inquiries.length ? `접수한 문의 ${inquiries.length}건` : '평일 09:00 – 18:00 운영'}
                onClick={() => {
                  setContactMode('history')
                  setSheet('contact')
                }}
              />
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-red-100 bg-white shadow-card dark:border-red-950 dark:bg-slate-850">
            <SettingRow icon="logout" title="회원 탈퇴" description="계정과 모든 데이터를 영구 삭제합니다" danger onClick={() => setSheet('withdraw')} />
          </section>

          <footer className="py-2 text-center text-xs leading-5 text-slate-400 dark:text-slate-600">
            <p className="font-semibold">Trip Wallet v1.0.0</p>
            <p>이용약관 · 개인정보처리방침</p>
          </footer>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto flex max-w-md items-center justify-around border-t border-slate-100 bg-white/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-nav backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
        <button type="button" className="flex flex-col items-center gap-1 text-slate-300">
          <Icon name="wallet" />
          <span className="text-xs font-medium">자산</span>
        </button>
        <button type="button" className="flex flex-col items-center gap-1 text-slate-300">
          <Icon name="card" />
          <span className="text-xs font-medium">소비</span>
        </button>
        <button type="button" className="flex flex-col items-center gap-1 text-primary">
          <Icon name="profile" />
          <span className="text-xs font-bold">내 정보</span>
        </button>
      </nav>

      {sheet === 'password' && (
        <Sheet title="비밀번호 변경" onClose={() => setSheet(null)}>
          <form className="space-y-4" onSubmit={submitPassword}>
            <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">주기적인 비밀번호 변경으로 계정을 안전하게 보호하세요.</p>
            <Field label="현재 비밀번호" type="password" value={password.current} onChange={(value) => setPassword((current) => ({ ...current, current: value }))} />
            <Field label="새 비밀번호" type="password" value={password.next} onChange={(value) => setPassword((current) => ({ ...current, next: value }))} />
            <Field label="새 비밀번호 확인" type="password" value={password.confirm} onChange={(value) => setPassword((current) => ({ ...current, confirm: value }))} />
            {passwordMessage && <p className="text-xs font-medium text-red-500">{passwordMessage}</p>}
            <button type="submit" className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary-hover">
              변경하기
            </button>
          </form>
        </Sheet>
      )}

      {sheet === 'contact' && (
        <Sheet title="문의하기" onClose={() => setSheet(null)}>
          {contactMode === 'history' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">나의 문의 내역</p>
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">접수한 문의와 답변 여부를 확인하세요.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setContactMode('form')}
                  className="rounded-xl bg-primary px-3.5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-primary-hover"
                >
                  새 문의
                </button>
              </div>

              {inquiries.length ? (
                <div className="space-y-3">
                  {inquiries.map((inquiry) => (
                    <article
                      key={inquiry.id}
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">{inquiry.createdAt}</span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                              inquiry.answered
                                ? 'bg-blue-50 text-primary dark:bg-blue-950/60 dark:text-blue-400'
                                : 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400'
                            }`}
                          >
                            {inquiry.answered ? '답변 완료' : '답변 대기'}
                          </span>
                          <button
                            type="button"
                            aria-label="문의 삭제"
                            onClick={() => {
                              if (!window.confirm('이 문의 내역을 삭제할까요?')) return
                              setInquiries((current) => current.filter((item) => item.id !== inquiry.id))
                              showToast('문의 내역을 삭제했습니다')
                            }}
                            className="flex size-7 items-center justify-center rounded-full text-slate-300 transition-colors hover:bg-red-50 hover:text-red-500 dark:text-slate-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                          >
                            <Icon name="trash" className="size-4" />
                          </button>
                        </div>
                      </div>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                        {inquiry.content}
                      </p>
                      {!inquiry.answered && (
                        <p className="mt-3 border-t border-slate-200 pt-3 text-xs text-slate-400 dark:border-slate-700 dark:text-slate-500">
                          문의를 확인하고 있어요. 답변이 등록되면 상태가 변경됩니다.
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 py-10 text-center dark:border-slate-700">
                  <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-blue-50 text-primary dark:bg-blue-950/60 dark:text-blue-400">
                    <Icon name="headset" />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">아직 문의 내역이 없어요</p>
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">궁금한 점이 있다면 새 문의를 남겨주세요.</p>
                </div>
              )}
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault()
                if (!contact.trim()) return
                const submittedInquiry: Inquiry = {
                  id: Date.now(),
                  content: contact.trim(),
                  createdAt: new Date().toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }),
                  answered: false,
                }
                setInquiries((current) => [submittedInquiry, ...current])
                setContact('')
                setContactMode('history')
                showToast('문의가 접수되었습니다')
              }}
            >
              <button
                type="button"
                onClick={() => setContactMode('history')}
                className="flex items-center gap-1 text-xs font-semibold text-slate-400 transition-colors hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
              >
                <Icon name="back" className="size-4" />
                문의 내역으로
              </button>
              <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">궁금한 점이나 불편한 점을 남겨주시면 24시간 내 답변드릴게요.</p>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-slate-500 dark:text-slate-400">문의 내용</span>
                <textarea
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  rows={5}
                  placeholder="문의 내용을 입력해주세요."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-500 dark:focus:bg-slate-800 dark:focus:ring-blue-950"
                />
              </label>
              <button type="submit" className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary-hover">
                문의 보내기
              </button>
            </form>
          )}
        </Sheet>
      )}

      {sheet === 'withdraw' && (
        <Sheet title="회원 탈퇴" onClose={() => setSheet(null)}>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault()
              if (withdrawConfirm !== '탈퇴하겠습니다') return
              setSheet(null)
              setWithdrawConfirm('')
              showToast('탈퇴 요청이 접수되었습니다')
            }}
          >
            <div className="rounded-2xl bg-red-50 p-4 text-sm leading-6 text-red-600">
              탈퇴하면 모든 데이터가 영구 삭제되며 복구할 수 없습니다.
            </div>
            <Field label="'탈퇴하겠습니다'를 입력해주세요" value={withdrawConfirm} onChange={setWithdrawConfirm} placeholder="탈퇴하겠습니다" />
            <button
              type="submit"
              disabled={withdrawConfirm !== '탈퇴하겠습니다'}
              className="w-full rounded-xl bg-red-500 py-3.5 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            >
              회원 탈퇴
            </button>
          </form>
        </Sheet>
      )}

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}
    </main>
  )
}
