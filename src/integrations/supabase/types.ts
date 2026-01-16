export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      analytics_alert_configs: {
        Row: {
          alert_type: string
          comparison_period: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          notify_email: boolean
          threshold_percentage: number
          updated_at: string
        }
        Insert: {
          alert_type: string
          comparison_period?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          notify_email?: boolean
          threshold_percentage?: number
          updated_at?: string
        }
        Update: {
          alert_type?: string
          comparison_period?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          notify_email?: boolean
          threshold_percentage?: number
          updated_at?: string
        }
        Relationships: []
      }
      analytics_alerts: {
        Row: {
          affected_path: string | null
          alert_type: string
          config_id: string | null
          deviation_percentage: number | null
          dismissed_at: string | null
          dismissed_by: string | null
          expected_value: number | null
          id: string
          is_dismissed: boolean
          is_read: boolean
          message: string
          metric_value: number | null
          read_at: string | null
          severity: string
          title: string
          triggered_at: string
        }
        Insert: {
          affected_path?: string | null
          alert_type: string
          config_id?: string | null
          deviation_percentage?: number | null
          dismissed_at?: string | null
          dismissed_by?: string | null
          expected_value?: number | null
          id?: string
          is_dismissed?: boolean
          is_read?: boolean
          message: string
          metric_value?: number | null
          read_at?: string | null
          severity: string
          title: string
          triggered_at?: string
        }
        Update: {
          affected_path?: string | null
          alert_type?: string
          config_id?: string | null
          deviation_percentage?: number | null
          dismissed_at?: string | null
          dismissed_by?: string | null
          expected_value?: number | null
          id?: string
          is_dismissed?: boolean
          is_read?: boolean
          message?: string
          metric_value?: number | null
          read_at?: string | null
          severity?: string
          title?: string
          triggered_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_alerts_config_id_fkey"
            columns: ["config_id"]
            isOneToOne: false
            referencedRelation: "analytics_alert_configs"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          acao: string
          created_at: string
          dados_antigos: Json | null
          dados_novos: Json | null
          entidade: string
          entidade_id: string | null
          id: string
          ip_address: string | null
          user_agent: string | null
          usuario_email: string | null
          usuario_id: string | null
        }
        Insert: {
          acao: string
          created_at?: string
          dados_antigos?: Json | null
          dados_novos?: Json | null
          entidade: string
          entidade_id?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          usuario_email?: string | null
          usuario_id?: string | null
        }
        Update: {
          acao?: string
          created_at?: string
          dados_antigos?: Json | null
          dados_novos?: Json | null
          entidade?: string
          entidade_id?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          usuario_email?: string | null
          usuario_id?: string | null
        }
        Relationships: []
      }
      content_backups: {
        Row: {
          backup_data: Json
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          backup_data?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          backup_data?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      crm_settings: {
        Row: {
          categoria: string | null
          chave: string
          descricao: string | null
          id: string
          updated_at: string
          valor: Json
        }
        Insert: {
          categoria?: string | null
          chave: string
          descricao?: string | null
          id?: string
          updated_at?: string
          valor?: Json
        }
        Update: {
          categoria?: string | null
          chave?: string
          descricao?: string | null
          id?: string
          updated_at?: string
          valor?: Json
        }
        Relationships: []
      }
      document_categories: {
        Row: {
          cor: string | null
          created_at: string
          descricao: string | null
          icone: string | null
          id: string
          is_active: boolean
          nome: string
          ordem: number | null
          updated_at: string
        }
        Insert: {
          cor?: string | null
          created_at?: string
          descricao?: string | null
          icone?: string | null
          id?: string
          is_active?: boolean
          nome: string
          ordem?: number | null
          updated_at?: string
        }
        Update: {
          cor?: string | null
          created_at?: string
          descricao?: string | null
          icone?: string | null
          id?: string
          is_active?: boolean
          nome?: string
          ordem?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      document_signatures: {
        Row: {
          assinatura_hash: string
          assinatura_imagem: string | null
          created_at: string
          document_id: string
          documento_assinante: string | null
          email_assinante: string | null
          id: string
          ip_address: string | null
          localizacao: Json | null
          nome_assinante: string
          tipo_assinante: string
          user_agent: string | null
        }
        Insert: {
          assinatura_hash: string
          assinatura_imagem?: string | null
          created_at?: string
          document_id: string
          documento_assinante?: string | null
          email_assinante?: string | null
          id?: string
          ip_address?: string | null
          localizacao?: Json | null
          nome_assinante: string
          tipo_assinante?: string
          user_agent?: string | null
        }
        Update: {
          assinatura_hash?: string
          assinatura_imagem?: string | null
          created_at?: string
          document_id?: string
          documento_assinante?: string | null
          email_assinante?: string | null
          id?: string
          ip_address?: string | null
          localizacao?: Json | null
          nome_assinante?: string
          tipo_assinante?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_signatures_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "generated_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      document_templates: {
        Row: {
          atualizado_por: string | null
          category_id: string | null
          conteudo: string
          created_at: string
          criado_por: string | null
          descricao: string | null
          id: string
          is_active: boolean
          nome: string
          updated_at: string
          versao: number | null
        }
        Insert: {
          atualizado_por?: string | null
          category_id?: string | null
          conteudo: string
          created_at?: string
          criado_por?: string | null
          descricao?: string | null
          id?: string
          is_active?: boolean
          nome: string
          updated_at?: string
          versao?: number | null
        }
        Update: {
          atualizado_por?: string | null
          category_id?: string | null
          conteudo?: string
          created_at?: string
          criado_por?: string | null
          descricao?: string | null
          id?: string
          is_active?: boolean
          nome?: string
          updated_at?: string
          versao?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "document_templates_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "document_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_documents: {
        Row: {
          arquivo_url: string | null
          assinado_em: string | null
          assinado_por: string | null
          assinatura_data: Json | null
          assinatura_hash: string | null
          assinatura_ip: string | null
          codigo_validacao: string | null
          conteudo_html: string
          created_at: string
          criado_por: string | null
          dados_preenchidos: Json
          enviado_em: string | null
          enviado_para: string | null
          id: string
          lead_id: string | null
          status: string | null
          template_id: string | null
          titulo: string
          updated_at: string
        }
        Insert: {
          arquivo_url?: string | null
          assinado_em?: string | null
          assinado_por?: string | null
          assinatura_data?: Json | null
          assinatura_hash?: string | null
          assinatura_ip?: string | null
          codigo_validacao?: string | null
          conteudo_html: string
          created_at?: string
          criado_por?: string | null
          dados_preenchidos?: Json
          enviado_em?: string | null
          enviado_para?: string | null
          id?: string
          lead_id?: string | null
          status?: string | null
          template_id?: string | null
          titulo: string
          updated_at?: string
        }
        Update: {
          arquivo_url?: string | null
          assinado_em?: string | null
          assinado_por?: string | null
          assinatura_data?: Json | null
          assinatura_hash?: string | null
          assinatura_ip?: string | null
          codigo_validacao?: string | null
          conteudo_html?: string
          created_at?: string
          criado_por?: string | null
          dados_preenchidos?: Json
          enviado_em?: string | null
          enviado_para?: string | null
          id?: string
          lead_id?: string | null
          status?: string | null
          template_id?: string | null
          titulo?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_documents_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_documents_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "document_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_interactions: {
        Row: {
          arquivo_url: string | null
          assunto_email: string | null
          corpo_email: string | null
          created_at: string
          criado_por: string | null
          data_agendada: string | null
          descricao: string | null
          duracao_minutos: number | null
          id: string
          lead_id: string
          link_reuniao: string | null
          local_reuniao: string | null
          tipo: Database["public"]["Enums"]["interaction_type"]
          titulo: string
          valor_proposta: number | null
        }
        Insert: {
          arquivo_url?: string | null
          assunto_email?: string | null
          corpo_email?: string | null
          created_at?: string
          criado_por?: string | null
          data_agendada?: string | null
          descricao?: string | null
          duracao_minutos?: number | null
          id?: string
          lead_id: string
          link_reuniao?: string | null
          local_reuniao?: string | null
          tipo: Database["public"]["Enums"]["interaction_type"]
          titulo: string
          valor_proposta?: number | null
        }
        Update: {
          arquivo_url?: string | null
          assunto_email?: string | null
          corpo_email?: string | null
          created_at?: string
          criado_por?: string | null
          data_agendada?: string | null
          descricao?: string | null
          duracao_minutos?: number | null
          id?: string
          lead_id?: string
          link_reuniao?: string | null
          local_reuniao?: string | null
          tipo?: Database["public"]["Enums"]["interaction_type"]
          titulo?: string
          valor_proposta?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_interactions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          atualizado_por: string | null
          cargo: string | null
          created_at: string
          criado_por: string | null
          data_fechamento_previsto: string | null
          data_primeiro_contato: string | null
          data_ultimo_contato: string | null
          email: string | null
          empresa: string | null
          id: string
          ip_origem: string | null
          nome: string
          observacoes: string | null
          origem: string | null
          pagina_origem: string | null
          prioridade: Database["public"]["Enums"]["priority_level"] | null
          probabilidade: number | null
          responsavel_id: string | null
          score: number | null
          status: Database["public"]["Enums"]["lead_status"]
          tags: string[] | null
          telefone: string | null
          updated_at: string
          user_agent_origem: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          valor_estimado: number | null
          whatsapp: string | null
        }
        Insert: {
          atualizado_por?: string | null
          cargo?: string | null
          created_at?: string
          criado_por?: string | null
          data_fechamento_previsto?: string | null
          data_primeiro_contato?: string | null
          data_ultimo_contato?: string | null
          email?: string | null
          empresa?: string | null
          id?: string
          ip_origem?: string | null
          nome: string
          observacoes?: string | null
          origem?: string | null
          pagina_origem?: string | null
          prioridade?: Database["public"]["Enums"]["priority_level"] | null
          probabilidade?: number | null
          responsavel_id?: string | null
          score?: number | null
          status?: Database["public"]["Enums"]["lead_status"]
          tags?: string[] | null
          telefone?: string | null
          updated_at?: string
          user_agent_origem?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          valor_estimado?: number | null
          whatsapp?: string | null
        }
        Update: {
          atualizado_por?: string | null
          cargo?: string | null
          created_at?: string
          criado_por?: string | null
          data_fechamento_previsto?: string | null
          data_primeiro_contato?: string | null
          data_ultimo_contato?: string | null
          email?: string | null
          empresa?: string | null
          id?: string
          ip_origem?: string | null
          nome?: string
          observacoes?: string | null
          origem?: string | null
          pagina_origem?: string | null
          prioridade?: Database["public"]["Enums"]["priority_level"] | null
          probabilidade?: number | null
          responsavel_id?: string | null
          score?: number | null
          status?: Database["public"]["Enums"]["lead_status"]
          tags?: string[] | null
          telefone?: string | null
          updated_at?: string
          user_agent_origem?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          valor_estimado?: number | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      navigation_items: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_visible: boolean
          name: string
          order_index: number
          parent_id: string | null
          path: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_visible?: boolean
          name: string
          order_index?: number
          parent_id?: string | null
          path: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_visible?: boolean
          name?: string
          order_index?: number
          parent_id?: string | null
          path?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "navigation_items_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "navigation_items"
            referencedColumns: ["id"]
          },
        ]
      }
      page_views: {
        Row: {
          created_at: string
          id: string
          ip_hash: string | null
          path: string
          referrer: string | null
          session_id: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ip_hash?: string | null
          path: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ip_hash?: string | null
          path?: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      pipeline_stages: {
        Row: {
          cor: string | null
          created_at: string
          descricao: string | null
          id: string
          is_active: boolean
          is_lost_stage: boolean | null
          is_won_stage: boolean | null
          nome: string
          ordem: number
          probabilidade_padrao: number | null
          updated_at: string
        }
        Insert: {
          cor?: string | null
          created_at?: string
          descricao?: string | null
          id?: string
          is_active?: boolean
          is_lost_stage?: boolean | null
          is_won_stage?: boolean | null
          nome: string
          ordem?: number
          probabilidade_padrao?: number | null
          updated_at?: string
        }
        Update: {
          cor?: string | null
          created_at?: string
          descricao?: string | null
          id?: string
          is_active?: boolean
          is_lost_stage?: boolean | null
          is_won_stage?: boolean | null
          nome?: string
          ordem?: number
          probabilidade_padrao?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          content_type: string
          content_value: Json
          created_at: string
          id: string
          is_active: boolean
          section_key: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          content_type?: string
          content_value?: Json
          created_at?: string
          id?: string
          is_active?: boolean
          section_key: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          content_type?: string
          content_value?: Json
          created_at?: string
          id?: string
          is_active?: boolean
          section_key?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          category: string
          created_at: string
          id: string
          key: string
          updated_at: string
          value: string | null
        }
        Insert: {
          category?: string
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          concluido_por: string | null
          created_at: string
          criado_por: string | null
          data_conclusao: string | null
          data_lembrete: string | null
          data_vencimento: string | null
          descricao: string | null
          id: string
          is_recorrente: boolean | null
          lead_id: string | null
          prioridade: Database["public"]["Enums"]["priority_level"] | null
          recorrencia_intervalo: number | null
          recorrencia_tipo: string | null
          responsavel_id: string | null
          status: Database["public"]["Enums"]["task_status"]
          tipo: string | null
          titulo: string
          updated_at: string
        }
        Insert: {
          concluido_por?: string | null
          created_at?: string
          criado_por?: string | null
          data_conclusao?: string | null
          data_lembrete?: string | null
          data_vencimento?: string | null
          descricao?: string | null
          id?: string
          is_recorrente?: boolean | null
          lead_id?: string | null
          prioridade?: Database["public"]["Enums"]["priority_level"] | null
          recorrencia_intervalo?: number | null
          recorrencia_tipo?: string | null
          responsavel_id?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          tipo?: string | null
          titulo: string
          updated_at?: string
        }
        Update: {
          concluido_por?: string | null
          created_at?: string
          criado_por?: string | null
          data_conclusao?: string | null
          data_lembrete?: string | null
          data_vencimento?: string | null
          descricao?: string | null
          id?: string
          is_recorrente?: boolean | null
          lead_id?: string | null
          prioridade?: Database["public"]["Enums"]["priority_level"] | null
          recorrencia_intervalo?: number | null
          recorrencia_tipo?: string | null
          responsavel_id?: string | null
          status?: Database["public"]["Enums"]["task_status"]
          tipo?: string | null
          titulo?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      template_fields: {
        Row: {
          campo_fonte: string | null
          created_at: string
          dica: string | null
          fonte_dados: string | null
          grupo: string | null
          id: string
          label: string
          mascara: string | null
          nome: string
          obrigatorio: boolean | null
          opcoes: Json | null
          ordem: number | null
          placeholder: string | null
          template_id: string
          tipo: string
          valor_padrao: string | null
        }
        Insert: {
          campo_fonte?: string | null
          created_at?: string
          dica?: string | null
          fonte_dados?: string | null
          grupo?: string | null
          id?: string
          label: string
          mascara?: string | null
          nome: string
          obrigatorio?: boolean | null
          opcoes?: Json | null
          ordem?: number | null
          placeholder?: string | null
          template_id: string
          tipo?: string
          valor_padrao?: string | null
        }
        Update: {
          campo_fonte?: string | null
          created_at?: string
          dica?: string | null
          fonte_dados?: string | null
          grupo?: string | null
          id?: string
          label?: string
          mascara?: string | null
          nome?: string
          obrigatorio?: boolean | null
          opcoes?: Json | null
          ordem?: number | null
          placeholder?: string | null
          template_id?: string
          tipo?: string
          valor_padrao?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "template_fields_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "document_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      template_versions: {
        Row: {
          campos: Json | null
          conteudo: string
          created_at: string
          criado_por: string | null
          id: string
          template_id: string
          versao: number
        }
        Insert: {
          campos?: Json | null
          conteudo: string
          created_at?: string
          criado_por?: string | null
          id?: string
          template_id: string
          versao: number
        }
        Update: {
          campos?: Json | null
          conteudo?: string
          created_at?: string
          criado_por?: string | null
          id?: string
          template_id?: string
          versao?: number
        }
        Relationships: [
          {
            foreignKeyName: "template_versions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "document_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      webhook_logs: {
        Row: {
          created_at: string
          error_message: string | null
          evento: string
          id: string
          payload: Json | null
          response_body: string | null
          response_time_ms: number | null
          retry_attempt: number | null
          status_code: number | null
          webhook_id: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          evento: string
          id?: string
          payload?: Json | null
          response_body?: string | null
          response_time_ms?: number | null
          retry_attempt?: number | null
          status_code?: number | null
          webhook_id: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          evento?: string
          id?: string
          payload?: Json | null
          response_body?: string | null
          response_time_ms?: number | null
          retry_attempt?: number | null
          status_code?: number | null
          webhook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhook_logs_webhook_id_fkey"
            columns: ["webhook_id"]
            isOneToOne: false
            referencedRelation: "webhooks"
            referencedColumns: ["id"]
          },
        ]
      }
      webhooks: {
        Row: {
          auth_type: string | null
          auth_value: string | null
          created_at: string
          criado_por: string | null
          descricao: string | null
          eventos: string[]
          headers: Json | null
          id: string
          is_active: boolean
          metodo: string | null
          nome: string
          retry_count: number | null
          timeout_seconds: number | null
          total_disparos: number | null
          ultimo_disparo: string | null
          ultimo_status: number | null
          updated_at: string
          url: string
        }
        Insert: {
          auth_type?: string | null
          auth_value?: string | null
          created_at?: string
          criado_por?: string | null
          descricao?: string | null
          eventos?: string[]
          headers?: Json | null
          id?: string
          is_active?: boolean
          metodo?: string | null
          nome: string
          retry_count?: number | null
          timeout_seconds?: number | null
          total_disparos?: number | null
          ultimo_disparo?: string | null
          ultimo_status?: number | null
          updated_at?: string
          url: string
        }
        Update: {
          auth_type?: string | null
          auth_value?: string | null
          created_at?: string
          criado_por?: string | null
          descricao?: string | null
          eventos?: string[]
          headers?: Json | null
          id?: string
          is_active?: boolean
          metodo?: string | null
          nome?: string
          retry_count?: number | null
          timeout_seconds?: number | null
          total_disparos?: number | null
          ultimo_disparo?: string | null
          ultimo_status?: number | null
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
    }
    Views: {
      document_stats: {
        Row: {
          assinados: number | null
          enviados: number | null
          finalizados: number | null
          rascunhos: number | null
          total_documents: number | null
          ultimos_30_dias: number | null
          ultimos_7_dias: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      calculate_lead_score: { Args: { lead_id: string }; Returns: number }
      check_analytics_anomalies: { Args: never; Returns: undefined }
      get_crm_stats: { Args: never; Returns: Json }
      get_page_view_stats: {
        Args: { end_date?: string; start_date?: string }
        Returns: {
          path: string
          unique_sessions: number
          view_count: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_or_editor: { Args: { _user_id: string }; Returns: boolean }
      log_audit: {
        Args: {
          p_acao: string
          p_dados_antigos?: Json
          p_dados_novos?: Json
          p_entidade: string
          p_entidade_id: string
        }
        Returns: undefined
      }
      trigger_webhooks: {
        Args: { p_evento: string; p_payload: Json }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "visualizador"
      interaction_type:
        | "email"
        | "telefone"
        | "whatsapp"
        | "reuniao"
        | "proposta"
        | "nota"
        | "sistema"
      lead_status:
        | "novo"
        | "qualificado"
        | "proposta_enviada"
        | "negociacao"
        | "fechado_ganho"
        | "fechado_perdido"
        | "arquivado"
      priority_level: "baixa" | "media" | "alta" | "urgente"
      task_status: "pendente" | "em_progresso" | "concluida" | "cancelada"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "visualizador"],
      interaction_type: [
        "email",
        "telefone",
        "whatsapp",
        "reuniao",
        "proposta",
        "nota",
        "sistema",
      ],
      lead_status: [
        "novo",
        "qualificado",
        "proposta_enviada",
        "negociacao",
        "fechado_ganho",
        "fechado_perdido",
        "arquivado",
      ],
      priority_level: ["baixa", "media", "alta", "urgente"],
      task_status: ["pendente", "em_progresso", "concluida", "cancelada"],
    },
  },
} as const
