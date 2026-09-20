import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, RotateCcw } from 'lucide-react';
import { useAnalyze } from '../hooks/useAnalyze';
import { UploadZone } from '../components/scan/UploadZone';
import { ResultCard, MatchList } from '../components/results/ResultCard';
import { ResultSkeleton, Toast } from '../components/ui/Toast';
import { Button } from '../components/ui/Button';
import { ConfettiBurst } from '../components/ui/ConfettiBurst';

export function ScanPage() {
  const { status, result, error, progress, analyze, reset } = useAnalyze();
  const [showToast, setShowToast] = useState(false);
  const [connectedMatch, setConnectedMatch] = useState<string | null>(null);
  const [confettiKey, setConfettiKey] = useState(0);

  const handleFile = async (file: File) => {
    setConnectedMatch(null);
    await analyze(file);
    if (status === 'error') setShowToast(true);
  };

  const handleConnect = () => {
    if (!result?.matches[0]) return;
    setConnectedMatch(result.matches[0].requestedBy);
    setConfettiKey((current) => current + 1);
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-14">
      <div className="mx-auto max-w-lg px-4 py-6 sm:px-6">

        {/* Back nav */}
        <div className="mb-6 flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded-lg px-1"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </Link>
          <h1 className="text-lg font-bold text-white">Scan an Item</h1>
          {status !== 'idle' && (
            <button
              onClick={reset}
              className="ml-auto flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded-lg px-1"
              aria-label="Reset scan"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset
            </button>
          )}
        </div>

        {/* Upload zone — only show when idle */}
        <AnimatePresence>
          {(status === 'idle' || status === 'loading') && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <UploadZone
                onFileSelect={handleFile}
                disabled={status === 'loading'}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <AnimatePresence>
          {status === 'loading' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6"
              role="status"
              aria-label="Analyzing item"
              aria-live="polite"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="h-2 w-2 rounded-full bg-teal-400"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    aria-hidden="true"
                  />
                  <p className="text-sm text-slate-300 font-medium">
                    AI is analyzing your item…
                  </p>
                </div>
                <span className="text-xs text-teal-400 font-semibold">{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-700" aria-hidden="true">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-teal-600 to-teal-400"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">
                Powered by AWS Bedrock · Claude
              </p>

              {/* Loading skeleton */}
              <div className="mt-6">
                <ResultSkeleton />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {status === 'success' && result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <ResultCard result={result} />
              <MatchList matches={result.matches} />

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="secondary"
                  className="flex-1 gap-2"
                  onClick={reset}
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  Scan Another
                </Button>
                {result.matches.length > 0 && (
                  <div className="relative flex-1">
                    {connectedMatch && <ConfettiBurst key={confettiKey} />}
                    <Button variant="primary" className="w-full" onClick={handleConnect}>
                      {connectedMatch ? `Paired with ${connectedMatch}` : 'Connect with Match'}
                    </Button>
                  </div>
                )}
              </div>
              {connectedMatch && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-xs font-medium text-teal-300"
                  role="status"
                >
                  Item paired successfully. {connectedMatch} will be notified.
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error state */}
        <AnimatePresence>
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center"
              role="alert"
            >
              <p className="text-3xl mb-3" aria-hidden="true">⚠️</p>
              <p className="font-semibold text-red-300 mb-2">Analysis failed</p>
              <p className="text-sm text-red-400/80 mb-5">{error}</p>
              <Button variant="secondary" onClick={reset} className="gap-2">
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Try Again
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {showToast && error && (
          <Toast
            message={error}
            type="error"
            onClose={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
