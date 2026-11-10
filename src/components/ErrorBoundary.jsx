import React from 'react';

/** Bitta bo'limdagi xato butun saytni "oq ekran"ga aylantirmasligi uchun. */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div role="alert" className="max-w-xl mx-auto my-16 rounded-2xl border border-red-500/30 bg-red-500/5 p-6 text-center space-y-3">
        <h2 className="text-lg font-bold text-red-200">Bu bo'limni yuklashda xatolik yuz berdi</h2>
        <p className="text-sm text-slate-400">Sahifani yangilab ko'ring yoki boshqa bo'limga o'ting.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200"
        >
          Sahifani yangilash
        </button>
      </div>
    );
  }
}
