import { useEffect, useState } from "react";

function generateUniqueId() {
  const length = 7;
  const radix = 36;
  return Math.random().toString(radix).substring(length);
}

/**
 * Function that generates new ids
 */
type IdGenerator = () => string;

/**
 * Returns a new unique id that is stabel accross state changes
 *
 * This default generator is good enough for simple use cases.
 * If you have more stringent requirements you can pass in your own generator
 */
export function useUniqueId(idGenerator: IdGenerator = generateUniqueId) {
  const [uid, setUid] = useState(idGenerator());

  useEffect(() => {
    setUid(idGenerator());
  }, []);

  return uid;
}
