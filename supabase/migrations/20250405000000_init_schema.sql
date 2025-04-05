-- Create schema for the SEOptimizer application

-- Users table
CREATE TABLE IF NOT EXISTS "users" (
  "id" UUID PRIMARY KEY NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "name" TEXT,
  "role" TEXT NOT NULL CHECK (role IN ('internal', 'client')),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on users
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;

-- Clients table
CREATE TABLE IF NOT EXISTS "clients" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "client_name" TEXT NOT NULL,
  "contact_info" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE ("user_id")
);

-- Enable RLS on clients
ALTER TABLE "clients" ENABLE ROW LEVEL SECURITY;

-- Tasks table
CREATE TABLE IF NOT EXISTS "tasks" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "client_id" UUID NOT NULL REFERENCES "clients"("id") ON DELETE CASCADE,
  "task_type" TEXT NOT NULL CHECK (task_type IN ('article', 'backlink', 'technical')),
  "details" JSONB NOT NULL DEFAULT '{}'::JSONB,
  "status" TEXT NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed')),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on tasks
ALTER TABLE "tasks" ENABLE ROW LEVEL SECURITY;

-- Articles table
CREATE TABLE IF NOT EXISTS "articles" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "task_id" UUID NOT NULL REFERENCES "tasks"("id") ON DELETE CASCADE,
  "content_markdown" TEXT NOT NULL,
  "language" TEXT NOT NULL CHECK (language IN ('en', 'fr')),
  "seo_score" NUMERIC,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on articles
ALTER TABLE "articles" ENABLE ROW LEVEL SECURITY;

-- Keywords table
CREATE TABLE IF NOT EXISTS "keywords" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "article_id" UUID NOT NULL REFERENCES "articles"("id") ON DELETE CASCADE,
  "keyword" TEXT NOT NULL,
  "related_data" JSONB,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on keywords
ALTER TABLE "keywords" ENABLE ROW LEVEL SECURITY;

-- AI Models table
CREATE TABLE IF NOT EXISTS "ai_models" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "model_name" TEXT NOT NULL UNIQUE,
  "configuration" JSONB NOT NULL DEFAULT '{}'::JSONB,
  "is_default" BOOLEAN NOT NULL DEFAULT FALSE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on ai_models
ALTER TABLE "ai_models" ENABLE ROW LEVEL SECURITY;

-- Comments table
CREATE TABLE IF NOT EXISTS "comments" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "task_id" UUID NOT NULL REFERENCES "tasks"("id") ON DELETE CASCADE,
  "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "content" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on comments
ALTER TABLE "comments" ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Users policies
CREATE POLICY "Users can view own profile" ON "users"
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Internal users can view all users" ON "users"
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'internal'
    )
  );

-- Clients policies
CREATE POLICY "Clients can view own client data" ON "clients"
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Internal users can view all clients" ON "clients"
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'internal'
    )
  );

CREATE POLICY "Internal users can manage clients" ON "clients"
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'internal'
    )
  );

-- Tasks policies
CREATE POLICY "Clients can view own tasks" ON "tasks"
  FOR SELECT USING (
    client_id IN (
      SELECT id FROM clients WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Internal users can view all tasks" ON "tasks"
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'internal'
    )
  );

CREATE POLICY "Internal users can manage tasks" ON "tasks"
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'internal'
    )
  );

-- Articles policies
CREATE POLICY "Clients can view own articles" ON "articles"
  FOR SELECT USING (
    task_id IN (
      SELECT id FROM tasks WHERE client_id IN (
        SELECT id FROM clients WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Internal users can view all articles" ON "articles"
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'internal'
    )
  );

CREATE POLICY "Internal users can manage articles" ON "articles"
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'internal'
    )
  );

-- Keywords policies
CREATE POLICY "Clients can view own keywords" ON "keywords"
  FOR SELECT USING (
    article_id IN (
      SELECT id FROM articles WHERE task_id IN (
        SELECT id FROM tasks WHERE client_id IN (
          SELECT id FROM clients WHERE user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Internal users can view all keywords" ON "keywords"
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'internal'
    )
  );

CREATE POLICY "Internal users can manage keywords" ON "keywords"
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'internal'
    )
  );

-- AI Models policies
CREATE POLICY "All authenticated users can view AI models" ON "ai_models"
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Internal users can manage AI models" ON "ai_models"
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'internal'
    )
  );

-- Comments policies
CREATE POLICY "Users can view comments on their tasks" ON "comments"
  FOR SELECT USING (
    task_id IN (
      SELECT id FROM tasks WHERE client_id IN (
        SELECT id FROM clients WHERE user_id = auth.uid()
      )
    ) OR user_id = auth.uid() OR auth.uid() IN (
      SELECT id FROM users WHERE role = 'internal'
    )
  );

CREATE POLICY "Users can add comments" ON "comments"
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own comments" ON "comments"
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Internal users can manage all comments" ON "comments"
  FOR ALL USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'internal'
    )
  );

-- Insert default AI models
INSERT INTO "ai_models" (model_name, configuration, is_default)
VALUES
  ('Claude 3.5 Sonnet', '{"max_tokens": 4000, "temperature": 0.7}', true),
  ('GPT-4', '{"max_tokens": 3000, "temperature": 0.8}', false),
  ('Gemini 2.5 Pro', '{"max_tokens": 3500, "temperature": 0.7}', false);

-- Create functions and triggers for updated_at fields
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_clients_updated_at
BEFORE UPDATE ON clients
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_tasks_updated_at
BEFORE UPDATE ON tasks
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON articles
FOR EACH ROW EXECUTE PROCEDURE update_modified_column(); 