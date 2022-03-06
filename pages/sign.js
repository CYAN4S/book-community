export default function Sign() {
  return (
    <form>
      <label htmlFor="email">이메일</label>
      <input type="email" name="email" id="email" />
      <label htmlFor="password">비밀번호</label>
      <input type="password" name="password" id="password" />
      <button>로그인</button>
    </form>
  );
}
