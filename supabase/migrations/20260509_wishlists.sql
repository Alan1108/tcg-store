CREATE TABLE IF NOT EXISTS wishlists (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  product_id  text NOT NULL,
  variant_id  text NOT NULL,
  created_at  timestamptz DEFAULT now(),
  UNIQUE (user_id, product_id, variant_id)
);

ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own wishlist"
  ON wishlists FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
