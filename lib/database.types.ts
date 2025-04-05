export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          role: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          id: string
          user_id: string
          client_name: string
          contact_info: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          client_name: string
          contact_info?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          client_name?: string
          contact_info?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tasks: {
        Row: {
          id: string
          client_id: string
          task_type: string
          details: Json
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          task_type: string
          details: Json
          status: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          task_type?: string
          details?: Json
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "clients"
            referencedColumns: ["id"]
          }
        ]
      }
      articles: {
        Row: {
          id: string
          task_id: string
          content_markdown: string
          language: string
          seo_score: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          task_id: string
          content_markdown: string
          language: string
          seo_score?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          task_id?: string
          content_markdown?: string
          language?: string
          seo_score?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_task_id_fkey"
            columns: ["task_id"]
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          }
        ]
      }
      keywords: {
        Row: {
          id: string
          article_id: string
          keyword: string
          related_data: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          article_id: string
          keyword: string
          related_data?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          article_id?: string
          keyword?: string
          related_data?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "keywords_article_id_fkey"
            columns: ["article_id"]
            referencedRelation: "articles"
            referencedColumns: ["id"]
          }
        ]
      }
      ai_models: {
        Row: {
          id: string
          model_name: string
          configuration: Json
          is_default: boolean
          created_at: string
        }
        Insert: {
          id?: string
          model_name: string
          configuration: Json
          is_default: boolean
          created_at?: string
        }
        Update: {
          id?: string
          model_name?: string
          configuration?: Json
          is_default?: boolean
          created_at?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          id: string
          task_id: string
          user_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          task_id: string
          user_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          task_id?: string
          user_id?: string
          content?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_task_id_fkey"
            columns: ["task_id"]
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 