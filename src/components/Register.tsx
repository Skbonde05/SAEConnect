import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  ChevronDown,
  Eye,
  EyeOff,
  GraduationCap,
  IdCard,
  Mail,
  Upload,
  User,
} from "lucide-react";

interface RegisterProps {
  onRegister?: (data: {
    fullName: string;
    email: string;
    password: string;
    role: string;
    branch: string;
    year?: string;
    graduationYear?: string;
    prn?: string;
    designation?: string;
    employeeId?: string;
    officialEmail?: string;
    company?: string;
    jobRole?: string;
    industry?: string;
    linkedin?: string;
  }) => void;

  onLogin?: () => void;
}

/* =====================================================
   CONSTANTS
===================================================== */

const INSTITUTE_NAME = "Sinhgad Academy of Engineering";

const branches = [
  "Computer Engineering",
  "Information Technology",
  "Artificial Intelligence & Data Science",
  "Electronics & Telecommunication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Other",
];

const years = [
  "First Year",
  "Second Year",
  "Third Year",
  "Final Year",
];

const designations = [
  "Professor",
  "Associate Professor",
  "Assistant Professor",
  "Head of Department",
  "Dean",
  "Training & Placement Officer",
  "Other",
];

/* =====================================================
   REGISTER PAGE
===================================================== */

const Register = ({ onRegister, onLogin }: RegisterProps) => {
  const [role, setRole] = useState<"student" | "alumni" | "faculty">(
    "student"
  );

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [branch, setBranch] = useState("");

  /* Student-only */
  const [year, setYear] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [prn, setPrn] = useState("");

  /* Alumni-only */
  const [company, setCompany] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [industry, setIndustry] = useState("");
  const [linkedin, setLinkedin] = useState("");

  /* Faculty-only */
  const [designation, setDesignation] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [officialEmail, setOfficialEmail] = useState("");

  /* Consent */
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);

  /* ===================================================
     SUBMIT
  =================================================== */

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!agreedTerms || !agreedPrivacy) {
      alert("Please agree to the Terms & Conditions and Privacy Policy.");
      return;
    }

    onRegister?.({
      fullName,
      email,
      password,
      role,
      branch,
      ...(role === "student" && {
        year,
        graduationYear,
        prn,
      }),
      ...(role === "alumni" && {
        graduationYear,
        prn,
        company,
        jobRole,
        industry,
        linkedin,
      }),
      ...(role === "faculty" && {
        designation,
        employeeId,
        officialEmail,
      }),
    });
  };

  /* ===================================================
     SHARED INPUT CLASSES
  =================================================== */

  const inputClass =
    "h-11 w-full rounded-md border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const plainInputClass =
    "h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const selectClass =
    "h-11 w-full appearance-none rounded-md border border-slate-300 bg-white pl-10 pr-9 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

  const sectionTitleClass =
    "text-xs font-semibold uppercase tracking-wider text-slate-400";

  return (
    <main className="h-screen w-full overflow-hidden bg-white font-sans antialiased">
      <div className="grid h-full grid-cols-1 lg:grid-cols-2">

        {/* =================================================
            LEFT PANEL — BRAND
        ================================================= */}

        <section className="relative hidden h-full overflow-hidden bg-slate-900 lg:flex">

          <img
            src="/images/registerbg.png"
            alt="Sinhgad Academy of Engineering campus"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />

          <div className="absolute inset-0 bg-slate-900/60" />

          <div className="relative z-10 flex h-full w-full flex-col px-12 py-10 xl:px-16">

            {/* Logo */}
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                <GraduationCap className="h-5 w-5 text-slate-900" />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  {INSTITUTE_NAME}
                </p>

                <p className="text-xs text-slate-300">
                  Placement Hub • Learn • Share • Grow
                </p>
              </div>

            </div>

            {/* Hero */}
            <div className="mt-16 max-w-md">

              <h2 className="text-4xl font-bold leading-[1.15] tracking-tight text-white xl:text-[42px]">
                Join the {INSTITUTE_NAME} community.
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-300 xl:text-base">
                Create your account to share experiences, ask questions,
                and grow with students, alumni, and faculty from SAE.
              </p>

            </div>

            {/* Quote */}
            <div className="mt-auto border-l-2 border-slate-500 pl-5">

              <p className="text-sm italic leading-6 text-slate-200">
                A stronger placement community builds brighter futures.
              </p>

              <p className="mt-2 text-xs font-medium text-slate-400">
                {INSTITUTE_NAME}
              </p>

            </div>

          </div>
        </section>

        {/* =================================================
            RIGHT PANEL — FORM
        ================================================= */}

        <section className="relative flex h-full flex-col overflow-y-auto bg-white">

          {/* Top bar */}
          <div className="flex shrink-0 items-center justify-end gap-4 px-6 py-6 sm:px-10 lg:px-14">

            <span className="text-sm font-medium text-slate-600">
              Already have an account?
            </span>

            <button
              type="button"
              onClick={onLogin}
              className="
                group inline-flex items-center gap-2
                rounded-full border border-blue-600
                px-5 py-2.5
                text-sm font-semibold text-blue-600
                transition-all duration-200
                hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-200/70
              "
            >
              Login
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

          </div>

          {/* Form */}
          <div className="flex flex-1 justify-center px-6 pb-10 sm:px-10 lg:px-14">

            <div className="w-full max-w-[560px]">

              {/* Heading */}
              <div>

                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                  Create your account
                </h1>

                <p className="mt-1.5 text-sm text-slate-500">
                  Fill in your details to join the community.
                </p>

              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">

                {/* =================================================
                    ROLE SELECTION
                ================================================= */}

                <div>

                  <p className={labelClass}>
                    I am a <span className="text-red-500">*</span>
                  </p>

                  <div className="grid grid-cols-3 gap-2">

                    {(["student", "alumni", "faculty"] as const).map(
                      (option) => (
                        <label
                          key={option}
                          className={`flex cursor-pointer items-center justify-center rounded-md border px-3 py-2.5 text-sm font-medium transition ${
                            role === option
                              ? "border-blue-600 bg-blue-50 text-blue-700"
                              : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                          }`}
                        >
                          <input
                            type="radio"
                            name="role"
                            value={option}
                            checked={role === option}
                            onChange={() => setRole(option)}
                            className="sr-only"
                          />
                          {option === "student"
                            ? "Current Student"
                            : option === "alumni"
                            ? "Alumni"
                            : "Faculty"}
                        </label>
                      )
                    )}

                  </div>

                </div>

                {/* =================================================
                    ACCOUNT DETAILS
                ================================================= */}

                <div className="space-y-4">

                  <p className={sectionTitleClass}>Account details</p>

                  {/* Full name */}
                  <div>

                    <label htmlFor="fullName" className={labelClass}>
                      Full name <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">

                      <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        placeholder="Enter your full name"
                        required
                        className={inputClass}
                      />

                    </div>

                  </div>

                  {/* Email */}
                  <div>

                    <label htmlFor="email" className={labelClass}>
                      Email address <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">

                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@sinhgad.edu"
                        required
                        className={inputClass}
                      />

                    </div>

                  </div>

                  {/* Password + Confirm */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <div>

                      <label htmlFor="password" className={labelClass}>
                        Password <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">

                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="Min. 8 characters"
                          required
                          minLength={8}
                          className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword((p) => !p)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>

                      </div>

                    </div>

                    <div>

                      <label htmlFor="confirmPassword" className={labelClass}>
                        Confirm password{" "}
                        <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">

                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(event) =>
                            setConfirmPassword(event.target.value)
                          }
                          placeholder="Re-enter password"
                          required
                          minLength={8}
                          className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((p) => !p)}
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>

                      </div>

                    </div>

                  </div>

                  {/* Profile photo (optional) */}
                  <div>

                    <label htmlFor="photo" className={labelClass}>
                      Profile photo{" "}
                      <span className="font-normal text-slate-400">
                        (optional)
                      </span>
                    </label>

                    <label
                      htmlFor="photo"
                      className="flex h-11 cursor-pointer items-center gap-2 rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 text-sm text-slate-500 transition hover:border-slate-400 hover:bg-slate-100"
                    >
                      <Upload className="h-4 w-4 text-slate-400" />
                      Upload a photo
                      <input
                        id="photo"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                      />
                    </label>

                  </div>

                </div>

                {/* =================================================
                    INSTITUTION / ACADEMIC DETAILS
                ================================================= */}

                <div className="space-y-4">

                  <p className={sectionTitleClass}>
                    {role === "faculty" ? "Institution" : "Academic details"}
                  </p>

                  {/* Fixed institute */}
                  <div>

                    <p className={labelClass}>Institute</p>

                    <div className="flex items-center gap-2.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5">

                      <Building2 className="h-4 w-4 shrink-0 text-slate-500" />

                      <span className="text-sm font-medium text-slate-700">
                        {INSTITUTE_NAME}
                      </span>

                    </div>

                  </div>

                  {/* Branch / Department — hidden for faculty */}
                  {role !== "faculty" && (
                    <div>

                      <label htmlFor="branch" className={labelClass}>
                        Branch / Department{" "}
                        <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">

                        <BookOpen className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                        <select
                          id="branch"
                          value={branch}
                          onChange={(event) => setBranch(event.target.value)}
                          required
                          className={selectClass}
                        >
                          <option value="">Select your branch</option>
                          {branches.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>

                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                      </div>

                    </div>
                  )}

                  {/* =================================================
                      STUDENT-ONLY FIELDS
                  ================================================= */}

                  {role === "student" && (
                    <>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <div>

                          <label htmlFor="year" className={labelClass}>
                            Current year{" "}
                            <span className="text-red-500">*</span>
                          </label>

                          <div className="relative">

                            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <select
                              id="year"
                              value={year}
                              onChange={(event) => setYear(event.target.value)}
                              required
                              className={selectClass}
                            >
                              <option value="">Select year</option>
                              {years.map((y) => (
                                <option key={y} value={y}>
                                  {y}
                                </option>
                              ))}
                            </select>

                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                          </div>

                        </div>

                        <div>

                          <label
                            htmlFor="graduationYear"
                            className={labelClass}
                          >
                            Expected graduation year{" "}
                            <span className="text-red-500">*</span>
                          </label>

                          <input
                            id="graduationYear"
                            type="number"
                            min="2025"
                            max="2035"
                            value={graduationYear}
                            onChange={(event) =>
                              setGraduationYear(event.target.value)
                            }
                            placeholder="e.g. 2027"
                            required
                            className={plainInputClass}
                          />

                        </div>

                      </div>

                      <div>

                        <label htmlFor="prn" className={labelClass}>
                          PRN / Student ID{" "}
                          <span className="font-normal text-slate-400">
                            (optional)
                          </span>
                        </label>

                        <div className="relative">

                          <IdCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                          <input
                            id="prn"
                            type="text"
                            value={prn}
                            onChange={(event) => setPrn(event.target.value)}
                            placeholder="Enter your PRN"
                            className={inputClass}
                          />

                        </div>

                        <p className="mt-1.5 text-xs text-slate-500">
                          Used for verification, not required to register.
                        </p>

                      </div>
                    </>
                  )}

                  {/* =================================================
                      ALUMNI-ONLY FIELDS
                  ================================================= */}

                  {role === "alumni" && (
                    <>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <div>

                          <label
                            htmlFor="graduationYear"
                            className={labelClass}
                          >
                            Graduation year{" "}
                            <span className="text-red-500">*</span>
                          </label>

                          <input
                            id="graduationYear"
                            type="number"
                            min="1980"
                            max="2025"
                            value={graduationYear}
                            onChange={(event) =>
                              setGraduationYear(event.target.value)
                            }
                            placeholder="e.g. 2020"
                            required
                            className={plainInputClass}
                          />

                        </div>

                        <div>

                          <label htmlFor="prn" className={labelClass}>
                            PRN / Old student ID{" "}
                            <span className="font-normal text-slate-400">
                              (optional)
                            </span>
                          </label>

                          <div className="relative">

                            <IdCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                              id="prn"
                              type="text"
                              value={prn}
                              onChange={(event) => setPrn(event.target.value)}
                              placeholder="Enter your old PRN"
                              className={inputClass}
                            />

                          </div>

                        </div>

                      </div>

                      <p className={`${sectionTitleClass} pt-2`}>
                        Professional details{" "}
                        <span className="font-normal normal-case text-slate-400">
                          (optional)
                        </span>
                      </p>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <div>

                          <label htmlFor="company" className={labelClass}>
                            Current company
                          </label>

                          <div className="relative">

                            <Briefcase className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                              id="company"
                              type="text"
                              value={company}
                              onChange={(event) => setCompany(event.target.value)}
                              placeholder="e.g. Infosys"
                              className={inputClass}
                            />

                          </div>

                        </div>

                        <div>

                          <label htmlFor="jobRole" className={labelClass}>
                            Job role / designation
                          </label>

                          <input
                            id="jobRole"
                            type="text"
                            value={jobRole}
                            onChange={(event) => setJobRole(event.target.value)}
                            placeholder="e.g. Software Engineer"
                            className={plainInputClass}
                          />

                        </div>

                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <div>

                          <label htmlFor="industry" className={labelClass}>
                            Industry / domain
                          </label>

                          <input
                            id="industry"
                            type="text"
                            value={industry}
                            onChange={(event) => setIndustry(event.target.value)}
                            placeholder="e.g. Fintech"
                            className={plainInputClass}
                          />

                        </div>

                        <div>

                          <label htmlFor="linkedin" className={labelClass}>
                            LinkedIn profile
                          </label>

                          <input
                            id="linkedin"
                            type="url"
                            value={linkedin}
                            onChange={(event) => setLinkedin(event.target.value)}
                            placeholder="linkedin.com/in/username"
                            className={plainInputClass}
                          />

                        </div>

                      </div>
                    </>
                  )}

                  {/* =================================================
                      FACULTY-ONLY FIELDS
                  ================================================= */}

                  {role === "faculty" && (
                    <>
                      <div>

                        <label htmlFor="department" className={labelClass}>
                          Department <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">

                          <BookOpen className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                          <select
                            id="department"
                            value={branch}
                            onChange={(event) => setBranch(event.target.value)}
                            required
                            className={selectClass}
                          >
                            <option value="">Select your department</option>
                            {branches.map((b) => (
                              <option key={b} value={b}>
                                {b}
                              </option>
                            ))}
                          </select>

                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                        </div>

                      </div>

                      <div>

                        <label htmlFor="designation" className={labelClass}>
                          Designation <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">

                          <Briefcase className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                          <select
                            id="designation"
                            value={designation}
                            onChange={(event) =>
                              setDesignation(event.target.value)
                            }
                            required
                            className={selectClass}
                          >
                            <option value="">Select designation</option>
                            {designations.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>

                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                        </div>

                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <div>

                          <label htmlFor="employeeId" className={labelClass}>
                            Employee ID{" "}
                            <span className="font-normal text-slate-400">
                              (optional)
                            </span>
                          </label>

                          <div className="relative">

                            <IdCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                              id="employeeId"
                              type="text"
                              value={employeeId}
                              onChange={(event) =>
                                setEmployeeId(event.target.value)
                              }
                              placeholder="Enter employee ID"
                              className={inputClass}
                            />

                          </div>

                        </div>

                        <div>

                          <label
                            htmlFor="officialEmail"
                            className={labelClass}
                          >
                            Official college email{" "}
                            <span className="font-normal text-slate-400">
                              (optional)
                            </span>
                          </label>

                          <div className="relative">

                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                              id="officialEmail"
                              type="email"
                              value={officialEmail}
                              onChange={(event) =>
                                setOfficialEmail(event.target.value)
                              }
                              placeholder="If different from login email"
                              className={inputClass}
                            />

                          </div>

                        </div>

                      </div>
                    </>
                  )}

                </div>

                {/* =================================================
                    CONSENT
                ================================================= */}

                <div className="space-y-2 border-t border-slate-100 pt-5">

                  <label className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-600">

                    <input
                      type="checkbox"
                      checked={agreedTerms}
                      onChange={(event) => setAgreedTerms(event.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-blue-600"
                    />

                    <span>
                      I agree to the{" "}
                      <button
                        type="button"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Terms &amp; Conditions
                      </button>
                    </span>

                  </label>

                  <label className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-600">

                    <input
                      type="checkbox"
                      checked={agreedPrivacy}
                      onChange={(event) =>
                        setAgreedPrivacy(event.target.checked)
                      }
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-blue-600"
                    />

                    <span>
                      I agree to the{" "}
                      <button
                        type="button"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Privacy Policy
                      </button>
                    </span>

                  </label>

                </div>

                {/* =================================================
                    SUBMIT
                ================================================= */}

                <button
                  type="submit"
                  className="
                    group flex h-11 w-full items-center justify-center gap-2
                    rounded-md
                    bg-blue-600
                    text-sm font-semibold text-white
                    transition
                    hover:bg-blue-700
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    active:bg-blue-800
                  "
                >
                  Create account
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>

              </form>

              {/* Bottom sign-in */}
              <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onLogin}
                  className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Sign in
                </button>
              </p>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
};

export default Register;