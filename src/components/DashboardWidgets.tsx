'use client';

import React from 'react';
import { Briefcase, TrendingUp, Users, CheckSquare, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { dashboardStats, pipelineStages, recentTasks } from '@/data/mockDashboard';
import { cn } from '@/lib/utils';

const iconMap = {
  briefcase: Briefcase,
  trending: TrendingUp,
  users: Users,
  check: CheckSquare,
};

const priorityStyles = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  low: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
};

const priorityLabels = { high: 'Высокий', medium: 'Средний', low: 'Низкий' };

export const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardStats.map((stat) => {
        const Icon = iconMap[stat.icon as keyof typeof iconMap];
        return (
          <Card key={stat.id} className="border-border/60 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                  <div className={cn(
                    'mt-1 flex items-center gap-1 text-xs font-medium',
                    stat.trend === 'up' ? 'text-emerald-600' : 'text-red-500'
                  )}>
                    {stat.trend === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                    {stat.change}
                  </div>
                </div>
                <div className="rounded-lg bg-primary/10 p-2.5">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export const PipelineWidget: React.FC = () => {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Воронка продаж</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {pipelineStages.map((stage) => (
          <div key={stage.stage}>
            <div className="mb-1 flex justify-between text-sm">
              <span>{stage.stage}</span>
              <span className="font-medium">{stage.count}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className={cn('h-full rounded-full transition-all', stage.color)}
                style={{ width: `${stage.percent}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export const TasksWidget: React.FC = () => {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Задачи</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentTasks.map((task) => (
            <div key={task.id} className="flex items-start gap-3 rounded-lg border border-border/60 p-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{task.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {task.assignee} · {task.due}
                </p>
              </div>
              <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium', priorityStyles[task.priority])}>
                {priorityLabels[task.priority]}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
